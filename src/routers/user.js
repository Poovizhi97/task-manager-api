const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require ('../middleware/auth')
const multer = require('multer')
const {sendWelcomeEmail ,cancelingEmail} = require('../emails/account')

// router.get('/test' , (req,res) =>{
//     res.send('From a new file')
// })


//******************using async and await post*************** */

router.post('/users' , async (req , res) =>{
    const user = new User(req.body)
    try{
      await user.save()
      sendWelcomeEmail(user.email , user.name)
       const token = await  user.generateAuthToken()
     res.status(200).send({ user, token })
    }catch (e) {
        res.status(400).send(e)
    }
})

//*********************user login post route*************** */

router.post('/users/login', async (req,res) =>{
    try{
              const user = await  User.findCredentials(req.body.email , req.body.password)
              const token = await user.generateAuthToken()
               
           res.send({ user , token } )
    }catch (e) {
          res.status(400).send(e)
    }
})

router.post('/users/logout', auth , async (req , res) =>{
      try {
            req.user.tokens = req.user.tokens.filter((token) =>{
                return token.token !== req.token
            })

            await req.user.save()

            res.send()
      } catch (e) {
             res.status(500).send()
      }
})

router.post('/users/logoutAll' , auth , async (req, res ) =>{
    try {
           req.user.tokens = []

           await req.user.save()

           res.send()
    } catch (e) {

        res.status(500).send()
           
    }
})



//**********************get method*********************88 */
router.get('/users/me' , auth ,async (req,res) =>{
    res.send(req.user)
    // try{
    //         const users = await  User.find({ })
    //          res.send(users)
    // }catch(e){
    //     res.status(500).send()
    // }
})

// router.get('/users/:id', async (req,res) =>{
//     const _id =req.params.id
//     try{
//      const user = await User.findById({_id})
//      if (!user) {
//          return res.status(404).send()
//      }
//     res.send(user)
//     }catch(e){
//         res.send(e)
//     }
// })

//***********************************update method********************************* */

// router.patch('/users/:id', async (req,res) =>{
//     const updates = Object.keys(req.body)
//     const allowUpdates = ['name' ,'email' ,'password' , 'age']
//     const isValidOperation = updates.every((update) => allowUpdates.includes(update))

//     if(!isValidOperation){
//         return res.status(400).send({ error: 'invalid updates'})
//     }

//    try {
//       const user = await User.findById(req.params.id)

//       updates.forEach((update) =>{
//           user[update] = req.body[update]
//       })
//       await user.save()
//       // const user = await User.findByIdAndUpdate(req.params.id , req.body , { new : true , runValidator : true})
//        if(!user){
//            res.status(400).send()
//        }
    
//        res.status(200).send(user)
//    } catch (e) {
//         res.status(400).send(e)
//    }
// })


//***********************************update method using auth ********************************* */

router.patch('/users/me', auth ,async (req,res) =>{
    const updates = Object.keys(req.body)
    const allowUpdates = ['name' ,'email' ,'password' , 'age']
    const isValidOperation = updates.every((update) => allowUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({ error: 'invalid updates'})
    }

   try {
         updates.forEach((update) =>{
          req.user[update] = req.body[update]
      })
      await req.user.save()
      // const user = await User.findByIdAndUpdate(req.params.id , req.body , { new : true , runValidator : true})
      
       res.status(200).send(req.user)
   } catch (e) {
        res.status(400).send(e)
   }
})

//********************************8delete method ****************************** */
//  router.delete('/users/:id' , async (req,res) =>{
 
//     try {
//           const user = await User.findByIdAndDelete(req.params.id )
      
//            if(!user) {
//                res.status(400).send()
//            }
//                res.status(200).send(user)
//     }catch (e) {
//             res.status(400).send(e)
//     }
// })

//****************usiing auth with delete method url********************************* */

router.delete('/users/me', auth , async (req,res) =>{
 
    try {
      
            await   req.user.remove()
            cancelingEmail(req.user.email,req.user.name)
            
               res.send(req.user)
    }catch (e) {
            res.status(500).send(e)
    }
})

//****************file upload using multer******************************** *

const upload = multer({
  //  dest : 'avatars', //this was using creating separate folders for img
    limits : {
        fileSize : 1000000
    },
    fileFilter (req, file, cb ) {
            if(!file.originalname.match(/\.(png|jpeg|jpg)$/)) {
                return cb(new Error ('Please upload a valid file'))
            }

            cb(undefined , true)
    }
})


router.post('/users/me/avatar',auth , upload.single('avatar'), async(req,res) =>{
  req.user.avatar =  req.file.buffer
  await req.user.save()
    res.send()
}, (error , req, res , next) =>{
        res.status(400).send({error : error.message})
})

//****deleteing the uploaded file******* */

router.delete('/users/me/avatar' ,auth ,async (req,res) =>{
   req.user.avatar = undefined
   await req.user.save()
   res.send()
})

//get the image by id

router.get('/users/:id/avatar', async (req,res) =>{
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
              throw new Error()
        }

         res.set('Content-Type', 'image/jpg')
         res.send(user.avatar)
    }catch (e) {
        res.status(404).send()
    }
})

module.exports = router
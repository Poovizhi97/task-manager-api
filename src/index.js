const express = require ('express')
require ('./db/mongoose')


const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()

//const port = process.env.PORT || 3000
const port = process.env.PORT

//const jwt = require ('jsonwebtoken')


// const multer = require ('multer')

// const upload = multer({
//     dest : 'images',
//     limits : {
//         fileSize: 1000000  //this will restrick the file size

//     },
//     fileFilter(req, file ,cb) {

        //pdf upload
            //  if (!file.originalname.endsWith('.pdf')) {
          
            //         return cb(new Error ('Please upload a PDF'))
            //  }

            //  cb(undefined,true)

           //documents upload
        //      if (!file.originalname.match(/\.(doc|docx)$/)) {  //match is allows us to use regular expressions
        //         return cb(new Error ('Please upload a word Document'))
        //  }

        //  cb(undefined,true)

        //   cb (new Error ('file must be a PDF'))
        //   cb(undefined, true)
        //   cb(undefined, false)
//     }
// })

// app.post('/upload' ,upload.single('upload'), (req,res) =>{
//           res.send()
// })


//*************error handleing middleware*********** */

// const errorMiddleware =(req, res, next) => {
//   throw new Error('This is my middleware')
// }

// app.post('/upload' ,errorMiddleware, (req,res) =>{
//     res.send()
// }, (error , req, res , next) =>{
//         res.status(400).send({ error : error.message})
// })

// app.post('/upload' ,upload.single('upload'), (req,res) =>{
//     res.send()
// }, (error , req, res , next) =>{
//         res.status(400).send({ error : error.message})
// })

// const myFunction =async () =>{
//     const token = jwt.sign( { _id : "123"} , 'thisisjwt')
//     console.log(token)

//     const data = jwt.verify(token , 'thisisjwt')
//     console.log(data)
// }
// myFunction() 

//***********express maintanace middleware ************** */

// app.use((req, res , next) =>{
//     // console.log(req.method, req.path)

//     // next()
//     if (req.method === 'GET'){
//         res.send('GET requests are disabled')

//     }else {
//         next()
//     }
// })

// app.use((req,res,next) =>{
//     res.status(503).send('site is currently dowm, check again !')
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

// const bcrypt =require ('bcryptjs')

// const myFunction = async () =>{
//     const password = ('poovizhi1402')
//     const bcryptPassword = await bcrypt.hash(password , 8)
//      console.log(password)
//     console.log(bcryptPassword)

//     const isMatching = await bcrypt.compare('poovizhi1402' , bcryptPassword)
//     console.log(isMatching)
// }

// myFunction()


app.listen(port, () =>{
    console.log("port is running on "+ port)
})



//**********************************post method******************** */
// app.post( '/users' ,( req,res) =>{
//     // console.log(req.body)
//     //  res.send("testing....")
//     const user = new User (req.body)

//     user.save().then(() =>{
//            res.status(200).send(user)
//     }).catch((e) =>{
//         res.status(400).send(e)
//     })
// })

// app.post('/tasks' , (req,res) =>{
//     console.log(req.body)
//     const task = new Task (req.body)

//     task.save().then( () =>{
//           res.status(201).send(task)
//     }).catch((e) =>{
//           res.status(400).send(e)
//     })
// })

//********************get method*********************************************** */

// app.get('/users' , (req,res) =>{
//     User.find({ }).then((user) =>{
//            res.send(user)
//     }).catch((e) =>{
//         res.send(e)
//     })
// })

// app.get('/users/:id' , (req,res) =>{
//     const _id = req.params.id
//     User.findById(_id).then((username1) =>{
//         res.send(username1)
//     }).catch((e) =>{
//         res.send(e)
//     })
// })

// app.get('/tasks', (req,res) =>{
//     Task.find({}).then((taskname) =>{
//         res.send(taskname)
//     }).catch((e) =>{
//         res.send(e)
//     })
// })

// app.get('/tasks/:id', (req,res) =>{
//     const _id =req.params.id
//     Task.findById({_id}).then((taskname) =>{
//         res.send(taskname)
//     }).catch((e) =>{
//         res.send(e)
//     })
// })


//const Task = require ('./models/task')

//*********relationship task with user connetion****** */
// const main = async () => {
//     const task = await Task.findById('60cb0dea2d16d73bec15e3cc') //id is task id
//     await task.populate('owner').execPopulate()
//     console.log(task.owner)
// }

// main()

//**********relationship user with task connection */

// const User = require('./models/user')
// const main2 = async () => {
//     const user = await User.findById('60cb086f091b93037c051732')//user id
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }

// main2()
const express = require('express')
const Taskrouter = new express.Router()
const Task = require('../models/task')
const auth = require ('../middleware/auth')


//******************using async and await*************** */



// Taskrouter.post('/tasks' , async(req, res) =>{
//     const task = new Task(req.body)
//     try{
//         await task.save()
//         res.status(200).send(task)
//     }catch (e) {
//         res.status(500).send(e)
//     }
// })

//********************using auth post ********************** */


Taskrouter.post('/tasks' , auth , async (req, res) =>{
    // const task = new Task(req.body)
    const task = new Task ({
        ...req.body,   //using spread operator for copy the body to this function
        "owner" : req.user._id
    })
    try{
        await task.save()
        res.status(201).send(task)
    }catch (e) {
        res.status(400).send(e)
    }
})

//*****************using ascyn and await in get method*************************



// Taskrouter.get('/tasks' , async (req,res) =>{
//     try{
//             const task = await  Task.find({ })
//              res.send(task)
//     }catch(e){
//         res.send(e)
//     }
// })

//***********using auth in get */

// Taskrouter.get('/tasks',auth , async (req,res) =>{
//     try{
//             ///const task = await  Task.find({ owner: req.user._id })
//              await req.user.populate('tasks').execPopulate()
//             res.send(req.user.tasks)
//     }catch(e){
//         res.send(e)
//     }
// })

//************************************filtering and pagination ,shorting the tasks using auth and get************ */
// GET /tasks?completed=true
// GET /tasks?limit=10&skip=0==result is first set of 10 data
//if the skip=10 the result that skips the first page and go to 2nd page of 10

//GET /tasks?sortBy=createdAt_asc or createdAt_desc

Taskrouter.get('/tasks',auth , async (req,res) =>{
    const match ={}
    const sort = {}

    if(req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

     if(req.query.sortBy){
         const parts = req.query.sortBy.split(':')
         sort[parts[0]] = parts[1] ==='desc' ? -1 : 1
     }

    try{
            ///const task = await  Task.find({ owner: req.user._id })
             await req.user.populate({
                 path : 'tasks',
                 match,
                 options : {
                      limit : parseInt(req.query.limit),
                      skip : parseInt(req.query.skip),
                    //   sort : {
                    //     //   createdAt: -1 , //desc
                    //     //   createdAt: 1  //asc
                    //     // completed : 1
                    //   }
                    sort
                 }
             }).execPopulate()
            res.send(req.user.tasks)
    }catch(e){
        res.send(e)
    }
})

// Taskrouter.get('/tasks/:id'  ,async (req,res) =>{
//     const _id = req.params.id
//     try{
//    const task = await Task.findById(_id)

//         if(!task){
//             return res.status(404).send()
//         }
       
      
//         res.send(task)
//     }catch(e) {
//         res.send(e)
//     }
// })

//*********************using auth  */

Taskrouter.get('/tasks/:id',auth  ,async (req,res) =>{
    const _id = req.params.id
    try{
//    const task = await Task.findById(_id)
      const task = await Task.findOne({ _id, owner: req.user._id})

        if(!task){
            return res.status(404).send()
        }
       
      
        res.send(task)
    }catch(e) {
        res.status(400).send()    }
})


//***********************************update method********************************* */



//task  

// Taskrouter.patch('/tasks/:id' , async (req,res) =>{

//     const updates = Object.keys(req.body)
//     const allowUpdates = ['description' , 'completed']
//     const isValidOperation = updates.every((update) => allowUpdates.includes(update))

//     if(!isValidOperation){
//         return res.status(400).send({ error: 'invalid updates'})
//     }

//     try {
//         const task = await Task.findById(req.params.id)

//         updates.forEach((update) =>{
//             task[update] = req.body[update]
//         })

//         await task.save()
//         //const task =await Task.findByIdAndUpdate( req.params.id , req.body , {new : true , runValidator : true})
//         if(!task) {
//                  res.status(400).send()
//         }
//         res.status(200).send(task)
//     } catch (e) {
//          res.status(400).send(e)
//     }
// })

//*********************using auth in update******************** */

Taskrouter.patch('/tasks/:id',auth , async (req,res) =>{

    const updates = Object.keys(req.body)
    const allowUpdates = ['description' , 'completed']
    const isValidOperation = updates.every((update) => allowUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({ error: 'invalid updates'})
    }

    try {
        const task = await Task.findOne({ _id: req.params.id , owner : req.user._id})
      //  const task = await Task.findById(req.params.id)

       //const task =await Task.findByIdAndUpdate( req.params.id , req.body , {new : true , runValidator : true})
        if(!task) {
           return  res.status(400).send()
        }

        updates.forEach((update) =>{
            task[update] = req.body[update]
        })

        await task.save()
        res.send(task)
    } catch (e) {
         res.status(400).send(e)
    }
})

//********************************8delete method ****************************** */

// Taskrouter.delete('/tasks/:id' , async (req,res) =>{
//     try {
//           const task = await Task.findByIdAndDelete(req.params.id )
//            if(!task) {
//                res.status(400).send()
//            }
//                res.status(200).send(task)
//     }catch (e) {
//             res.status(400).send(e)
//     }
// })

//*******************************delete using auth****************** */


Taskrouter.delete('/tasks/:id',auth , async (req,res) =>{
    try {
        const task = await Task.findOneAndDelete({_id : req.params.id, owner :req.user._id})
        //  const task = await Task.findByIdAndDelete(req.params.id )
           if(!task) {
               res.status(400).send()
           }
               res.status(200).send(task)
    }catch (e) {
            res.status(400).send(e)
    }
})

module.exports = Taskrouter
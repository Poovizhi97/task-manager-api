const { Db } = require('mongodb')
const mongoose = require('mongoose')


mongoose.connect(process.env.MONGODB_URL,{
             useNewUrlParser : true,
             useCreateIndex : true

})



// const me = new User ({
//     name : 'Poovizhi   ',
//     email :'POOVIZHI.AARYA@GMAIL.COM',
//     password : '  poovizhi',
//     age : 23
// })

// me.save().then( () =>{
//     console.log(me)
// }).catch( (err) => {
//    console.log('error', err)
// })


//task 

// const Task = mongoose.model('task' , {
//     description : {
//          type : String,
//          trim : true,
//          require : true
//     },
//     completed : {
//         type : Boolean,
//         default : false
//     }
// })

// const work = new Task ({
//     description : "       hello mongoose chapter",
//     // completed : true,
  
   
// })

// work.save().then(( ) =>{
//     console.log(work)
// }).catch((err) =>{
//     console.log('error' , err)
// })
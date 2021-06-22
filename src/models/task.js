const mongoose = require ('mongoose')

const taskSchema = new mongoose.Schema(
    {
        description : {
             type : String,
             required : true,
             trim : true,
        
        },
        completed : {
            type : Boolean,
            default : false
        },
        owner : {
            type : mongoose.Schema.Types.ObjectId,
            required : true,
            ref : 'User'
    
        }
    },{
        timestamps : true
    })

const Task = mongoose.model('Task' , taskSchema)

// const work = new Task ({
//     description : "       hello mongoose chapter",
//     // completed : true,
  
   
// })

// work.save().then(( ) =>{
//     console.log(work)
// }).catch((err) =>{
//     console.log('error' , err)
// })

module.exports = Task
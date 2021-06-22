require('../src/db/mongoose')

const User = require('../src/models/user')

const Task =require('../src/models/task')

//60c06330688fd04c8cd18354


// User.findByIdAndUpdate('60c06330688fd04c8cd18354',{age : 56}).then((user) =>{
//     console.log(user)
//     return User.countDocuments({age :56})
// }).then((result) =>{
//        console.log(result)
// }).catch((e) =>{
//     console.log(e)
// })


//***********************using async and await************************* */
const updateAgeAndCount = async (id , age) =>{
    const user = User.findByIdAndUpdate (id ,{age})
    const count =User.countDocuments({age})
      return count
    
}

updateAgeAndCount('60c06330688fd04c8cd18354', 8).then((result) =>{
    console.log(result)
}).catch((e) =>{
    console.log(e)
})

//task
//*********delete by id using promis chaining************ */

// Task.findByIdAndDelete('60c06525cddbfd3d248d24d4').then((task) =>{
//     console.log(task)

//     return Task.countDocuments({completed : false})
// }).then((result) =>{
//     console.log(result)
// }).catch((e) =>{
//     console.log(e)
// })
//task for async and await 

const deleteTaskAndCount = async (id) =>{
    const task = Task.findByIdAndDelete(id)
    const count =Task.countDocuments({comleted : false})
    return count
}

deleteTaskAndCount('60c06525cddbfd3d248d24d4').then((result) =>{
    console.log(result)
}).catch((e) =>{
    console.log(e)
})
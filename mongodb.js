//CRUD create read update delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectId =mongodb.ObjectID

const {MongoClient,ObjectID} = require('mongodb')

const connectionURL = "mongodb://127.0.0.1:27017"
const databaseName = "test-manager"

// const id = new ObjectID()

// console.log(id.id.length)
// console.log(id.toHexString().length)
// console.log(id.getTimestamp())


MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error,client) =>{
     if (error) {
           console.log('Unable to connect to database')
     }

 const db = client.db(databaseName)
//***************************start fetching data ********************* */

// db.collection('users').findOne({_id: new ObjectID("60bf0dbb87bbfa39fcf033d3")} ,(error,user ) =>{
//     if(error){
//         return console.log('unable to fetch')
//     }

//     console.log(user)
// })


//find use only cursor and not uses callback fn 
// db.collection('users').find({ age:23 }).toArray((error, users) =>{
//       console.log(users)
// })

//task

// db.collection('task').findOne({_id: new ObjectID ("60bf0f15d495562d90d825ef")} , (error,task1) =>{
//     console.log(task1)
// })

// db.collection('task').find({completed : false}).toArray((error,task2) =>{
//           console.log(task2)
// })

//*****************end fetching data ********************************/

//***********************inserting data************************ */
//  db.collection('users').insertOne({
//      _id: id,
//      name:"Pooja",
//      age: 28
// //  })
//  }, (error, result) =>{
//         if(error){
//             return console.log("unable to insert data")
//         }

//         console.log(result.ops)
//  })

//insertmany
//    db.collection('users').insertMany([
//        {
//            name: 'pavithra',
//            age:29
//        },{
//            name:'priya',
//            age: 25
//        }
//    ], (error,result) =>{
//           if(error) {
//               return console.log('unable to insert documents')
//           }


//           console.log(result.ops)
//    })

//task 
    // db.collection('task').insertMany([
    //     {
    //         description: "mongodb is very easy to learn",
    //         completed: true
    //     },{
    //         description:"it is used to storing the data",
    //         completed: false
    //     }
    // ],(error,result) =>{
    //          if(error) {
    //              return console.log("unable to insert data")
    //          }

    //          console.log(result.ops)
    // })

    //******************************inserting data end here******************** */
   

    //*****************updating data starts************ */

    //  db.collection('users').updateOne({
    //      _id : new ObjectID ("60bf0b787ae8a844bc9ca39a")
    //  },{
    //     //  $set :{
    //     //      name:"vithya"
    //     //  }

    //     $inc :{
    //         age:33
    //     }
    //  }).then((result) =>{
    //       console.log(result)
    //  }).catch( (error) =>{
    //      console.log(error)
    //  })

    // db.collection('task').updateMany({
    //     completed :false
    // },{
    //     $set:{
    //         completed:true
    //     }
    // }).then( (result) =>{
    //     console.log(result)
    // }).catch( (error) =>{
    //     console.log(error)
    // })

    //*************8updating data end here****************** */


   //*****************delete data start here ***********************/
   
//    db.collection('users').deleteMany({
//        age: 23
//    }).then((result) =>{
//        console.log(result)
//    }).catch((error) =>{
//         console.log(error)
//    })

//task

db.collection('task').deleteOne({
   _id :new ObjectID ("60bf0f15d495562d90d825ef")
   
},{
    "description" : "mongodb is very easy to learn"
}).then((result) =>{
    console.log(result)
}).catch((error) =>{
    console.log(error)
})

   //**************************delete end here */
})


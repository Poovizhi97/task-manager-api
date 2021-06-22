const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt =require ('bcryptjs')
const Task = require ('./task')
const userSchema = new mongoose.Schema({
    name : {
            type : String,
            required : true,
            trim : true,
    },
  email:  {
               type : String,
               unique : true,
               required : true,
               lowercase : true,
               validate(value){
                   if(!validator.isEmail(value)){
                       throw new Error('Please enter the valid email')
                   }
               }
              
    },
    password :{
              type : String,
              required : true,
            //   minlength : 7,
              trim : true,
             
              validate(value){
                  if(value.toLowerCase().includes("password")){
                      throw new Error ('password can not contain  password')
                  }
              }
    },
    age : {
            type : Number,
            default :0,
            validate(value){
                if(value < 0){
                    throw new Error('age must be positive number')
                }
            }
    },
    tokens : [{
        token : {
            type : String,
            required : true
        }
    }],
    avatar : {
        type : Buffer
    }
},{
    timestamps : true
})

//virual property it is not gone to store in database it is relationship between two entities

userSchema.virtual('tasks' , {
    ref : 'Task' ,
    localField : '_id',
    foreignField : 'owner'
})

userSchema.methods.toJSON = function () {
     const user = this
     const userObject = user.toObject()
        
     delete userObject.password
     delete userObject.tokens
     delete userObject.avatar

     return userObject
}

//authentication jwt web token
userSchema.methods.generateAuthToken = async function () {
   const user = this
   const token = jwt.sign({_id : user._id.toString() }, process.env.JWT_SECRET)
   
   user.tokens = user.tokens.concat ({token})

   await user.save()

   return token
   
}


//login

userSchema.statics.findCredentials = async (email , password) =>{
    const user = await User.findOne({email})

    if(!user) {
        throw new Error ('Unable to login !')
    }
     const isMatch = await bcrypt.compare(password , user.password)

     if(!isMatch) {
         throw new Error ('Unable to login !')
     }

     return user
}

//hash the plain text password before saving

//pre means before the user data to be save

userSchema.pre('save' , async function (next) {
  
  const user = this //this key is used to save a document (this) give the access to the individual user})
   
//   console.log('just before saving')
      if (user.isModified('password')) {
         user.password = await bcrypt.hash(user.password,8)
      }

   next()
})

//delete user tasks when user is removed

userSchema.pre('remove' , async function (next){
    const user = this
     await  Task.deleteMany({ owner: user._id})

    next()
})



//run some code before the user to save
const User = mongoose.model( 'User' , userSchema)

// const User = mongoose.model( 'user' , {
    
//             name : {
//                     type : String,
//                     require : true,
//                     trim : true,
//             },
//           email:  {
//                        type : String,
//                        require : true,
//                        lowercase : true,
//                        validate(value){
//                            if(!validator.isEmail(value)){
//                                throw new Error('Please enter the valid email')
//                            }
//                        }
                      
//             },
//             password :{
//                       type : String,
//                       require : true,
//                     //   minlength : 7,
//                       trim : true,
                     
//                       validate(value){
//                           if(value.toLowerCase().includes("password")){
//                               throw new Error ('password can not contain  password')
//                           }
//                       }
//             },
//             age : {
//                     type : Number,
//                     default :0,
//                     validate(value){
//                         if(value < 0){
//                             throw new Error('age must be positive number')
//                         }
//                     }
//             }
        
// })

module.exports = User
const mongoose=require('mongoose')
var userModelSchema=mongoose.Schema({
    status:{
        type:String,
        default:"Active"
    },
    role:{
        type:String,
        default:"admin"
    },
    username:{
        type:String,
    },
    name:{
        type:String,
    },
    password:{
        type:String,
    },
    phone:{
        type:Number,
    },
    email:{
        type:String,
    }
})

module.exports=mongoose.model("userModel",userModelSchema);
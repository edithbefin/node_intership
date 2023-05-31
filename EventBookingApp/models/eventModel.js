const mongoose=require('mongoose')
var eventModelSchema=mongoose.Schema({
    status:{
        type:String,
        default:"Active"
    },
    name:{
        type:String,
    },
    host:{
        type:String,
    },
    fromDate:{
        type:Date,
    },
    toDate:{
        type:Date,
    },
    venue:{
        type:String,
    },
})

module.exports=mongoose.model("eventModel",eventModelSchema);
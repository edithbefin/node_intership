const mongoose=require('mongoose')
var eventBookingModelSchema=mongoose.Schema({
    status:{
        type:String,
        default:"Active"
    },
    name:{
        type:String,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userModel"
    },
    eventId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"eventModel"
    },
    noofseat:{
        type:Number
    },
    date:{
        type:Date,
        default:new Date()
    },
    adult:{
        type:Number
    },
    childern:{
        type:Number
    },
    totalCount:{
        type:Number
    },

});
module.exports=mongoose.model("eventBookingModel",eventBookingModelSchema);
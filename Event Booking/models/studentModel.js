const mongoose = require('mongoose');

var studentModelSchema=mongoose.Schema({

    status :{
        type : String,
        default: "Active",
    },
    admissionNumber :{
        type:String,
    },
    name:{
        type:String,
    },
    department:{
        type:String,
    },
    semester:{
        type:String,
    },
    phone:{
        type:Number,
    },
    dateofbirth :{
        type:Date,
    },

});

module.exports=mongoose.model("studentModel",studentModelSchema);
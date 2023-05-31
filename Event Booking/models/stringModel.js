const mongoose = require('mongoose');

var stringModelSchema=mongoose.Schema({

    status :{
        type : String,
        default: "Active",
    },
    data1 :{
        type:Number,
    },
    data2:{
        type:String,
    },
    data3:{
        type:Boolean,
    },


});

module.exports=mongoose.model("stringModel",stringModelSchema);
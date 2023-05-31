const mongoose = require('mongoose');

var arrayModelSchema=mongoose.Schema({

    status :{
        type : String,
        default: "Active",
    },
    array1 :{
        type:[Number],
    },
    array2 :{
        type:[Number],
    },
    concatArray :{
        type:[Number],
    },


});

module.exports=mongoose.model("arrayModel",arrayModelSchema);
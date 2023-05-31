const express = require('express');
const arrayModel=require('../models/arrayModel');

let router =express();

router.post('/string/sort',
async(req,res)=>{
    var {arra1,arra2}=req.body;

    var concat=arra1.concat(arra2);

    var data=new arrayModel();
    data.array1=arra1;
    data.array2=arra2;
    data.concatArray=concat;
    await data.save();

    console.log(arra1);
    console.log(arra2);
    console.log(concat);
//     for(var i=0;i<S.length;i++) 
// {
//     for(var j=i+1;j<S.length;j++)
//     { 
//         if(S[i].length>S[j].length)
//         {
//             k =S[i];
//             S[i]=S[j];
//             S[j]=k;
//         }
//     }
// }

// console.log("Min :",S[0]);
// console.log("Max:",S[S.length-1]);

res.status(200).json
({
    status : true,

})
}
);

module.exports=router;

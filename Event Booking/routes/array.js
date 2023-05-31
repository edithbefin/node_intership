const express = require('express');
let router =express();

router.post('/array/sort',
async(req,res)=>{
try{

var {A}=req.body;
var k;
for(var i=0;i<A.length;i++)
{
    for(var j=i+1;j<A.length;j++)
    {
        if(A[i]>A[j])
        {
            k =A[i];
            A[i]=A[j];
            A[j]=k;
        }
    }
}
console.log(A);
res.status(200).json
({
    status : true,
    data : A
})
return ;
}

catch(e)
{
    console.log(e);
}
});
router.post('/slice/string',
async(req,res)=>{


var {S}=req.body;

var p=S.split("+");

console.log(p);


});

module.exports=router;

const express = require('express');

const studentModel=require('../models/studentModel');

let router =express();


try{
router.post('/student/data',
async(req,res)=>{
var{adno,nam,dept,sem,phno,dob}=req.body;
if(adno==undefined||adno==null)
{
res.status(200).json
({
    status : false,
});
return ;

}
if(nam==undefined||nam==null)
{
res.status(200).json
({
    status : false,
});
return ;

}
if(dept==undefined||dept==null)
{
res.status(200).json
({
    status : false,

});
return ;

}
if(sem==undefined||sem==null)
{
res.status(200).json
({
    status : false,
});
return ;

}
if(phno==undefined||phno==null)
{
res.status(200).json
({
    status : false,
});
return ;

}
if(dob==undefined||dob==null)
{
res.status(200).json
({
    status : false,
   
});
return ;

}
if(typeof adno!=="string")
{
res.status(200).json
({
    status : false,
    msg: "Invalid Data Type adno"
});
return ;

}
if(typeof nam!=="string")
{
res.status(200).json
({
    status : false,
    msg: "Invalid Data Type nam"
});
return ;

}
if(typeof dept!=="string")
{
res.status(200).json
({
    status : false,
    msg: "Invalid Data Type dept"
});
return ;

}
if(typeof sem!=="string")
{
res.status(200).json
({
    status : false,
    msg: "Invalid Data Type"
});
return ;

}
if(typeof phno!=="number")
{
res.status(200).json
({
    status : false,
    msg: "Invalid Data Type phno"
});
return ;

}
if(typeof dob!=="string")
{
res.status(200).json
({
    status : false,
    msg: "Invalid Data Type date"
});
return ;

} 

res.status(200).json
({
    status:true,
})

var data=new studentModel();
data.admissionNumber=adno;
data.name=nam;
data.department=dept;
data.semester=sem;
data.phone=phno;
data.dateofbirth=dob;
await data.save();



});
}
catch(e)
{
    console.log(e);
}

router.get('/get/student',async(req,res)=>{
    try{
    var count=await studentModel.countDocuments({status:"Active"});
    console.log(count);
   

    res.status(200).json({
        status :true,
        data:count,
    });

    }

catch(e){
    console.log(e);
}

});
router.post('/get/phone',async(req,res)=>{
try{
var {unid,phno}=req.body;
if(unid==undefined||unid==null)
{
res.status(200).json
({
    status : false,
});
return ;
}

var data=await studentModel.findOne({_id:unid});
console.log(data);
data.phone=phno;
await data.save()
console.log(data);



}
catch(e)
{
    console.log(e);
}
});
module.exports=router;
const express = require('express');
const bcrypt =require('bcryptjs');
let router=express();
const userModel=require('../Models/userModel');
const eventModel=require('../Models/eventModel');
const tokenModel=require('../Models/tokenModel');
const jwt=require('jsonwebtoken');
const adminAuth=require('../Middleware/adminAuth');
const userAuth=require('../Middleware/userAuth');
const eventBookingModel=require('../models/eventBookingModel');


router.post('/eventApp/signup',async(req,res)=>{
    try{
        var {usrnme,nme,pwd,ph,emal,role}=req.body;
        
        if(usrnme==undefined||usrnme==null){
            res.status(200).json
            ({
                status:false,
                msg:"Username is invalid"
            })
            return;
        }
        if(nme==undefined||nme==null){
            res.status(200).json
            ({
                status:false,
                msg:"Name is invalid"
            })
            return;
        }
        if(pwd==undefined||pwd==null){
            res.status(200).json
            ({
                status:false,
                msg:"Password is invalid"
            })
            return;
        }
        if(ph==undefined||ph==null){
            res.status(200).json
            ({
                status:false,
                msg:"Phone number is invalid"
            })
            return;
        }
        if(emal==undefined||emal==null){
            res.status(200).json
            ({
                status:false,
                msg:"Email is invalid"
            })
            return;
        }
        if(role==undefined||role==null){
            res.status(200).json
            ({
                status:false,
                msg:"Role is invalid"
            })
            return;
        }
        var alreadyexists=await userModel.findOne({phone:ph})
        if(alreadyexists!=null||alreadyexists!=undefined){
            res.status(200).json
            ({
                status:false,
                msg:"Phone number already exist"
            })
            return;
        }
        var encryptPassword= await bcrypt.hash(pwd,10);

        var data=new userModel();
        
        data.username=usrnme;
        data.name=nme;
        data.password=encryptPassword;
        data.phone=ph;
        data.email=emal;
        data.role=role;

        await data.save()
        res.status(200).json
        ({
            status:true,
            username:usrnme,
            name:nme,
            password:encryptPassword,
            phone:ph,
            email:emal
        })
        return;
        }
    catch(e){+
        console.log("Error detected");
        console.log(e);
    }
});    
router.post('/eventApp/event',adminAuth,async(req,res)=>{
    try{
        var {name,host,fromDate,toDate,venue}=req.body;
        
        if(name==undefined||name==null){
            res.status(200).json
            ({
                status:false,
                msg:"Name is invalid"
            })
            return;
        }
        if(host==undefined||host==null){
            res.status(200).json
            ({
                status:false,
                msg:"Hostname is invalid"
            })
            return;
        }
        if(fromDate==undefined||fromDate==null){
            res.status(200).json
            ({
                status:false,
                msg:"From date is invalid"
            })
            return;
        }
        if(toDate==undefined||toDate==null){
            res.status(200).json
            ({
                status:false,
                msg:"To date is invalid"
            })
            return;
        }
        if(venue==undefined||venue==null){
            res.status(200).json
            ({
                status:false,
                msg:"Venue name is invalid"
            })
            return;
        }

        var data=new eventModel();
        
        data.name=name;
        data.host=host;
        data.fromDate=fromDate;
        data.toDate=toDate;
        data.venue=venue;
        await data.save()
        res.status(200).json
        ({
            status:true,
            name:name,
            host:host,
            fromDate:fromDate,
            toDate:toDate,
            venue:venue
        })
        return;
        }
    catch(e){
        console.log("Error detected");
        console.log(e);
    }
});
router.post('/eventApp/login',async(req,res)=>{
    try{
        var {ph,pwd}=req.body;
        if(ph==undefined||ph==null){
            res.status(200).json
            ({
                status:false,
                msg:"Phone number is invalid"
            })
            return;
        }
        if(pwd==null||pwd==undefined){
            res.status(200).json
            ({
                status:false,
                msg:"Phone number is invalid"
            })
            return;
        }
        var user=await userModel.findOne({phone:ph})
        if(user==null||user==undefined){
            res.status(200).json
            ({
                status:false,
                msg:"user not found"
            })
            return;
        }

        if(await bcrypt.compare(pwd,user.password))
        {
            var token=jwt.sign({id : user._id,user:user},"test");

            var tokenData=new tokenModel();
            tokenData.userId=user._id;
            tokenData.token=token;
            await tokenData.save();

            console.log(token);
            res.status(200).json
            ({
                status:true,
                msg:"Login Success",
                token:token

            })
            return;
        }
        else
        {
            res.status(200).json
            ({
                status:false,
                msg:"Invalid Credential"

            })
            return;   
        }

    }
    catch(e){
        console.log(e);
    }
});

router.post('/eventApp/validateToken',async(req,res)=>{
    try{
    var {tokenPost}=req.body;

    console.log(tokenPost);
    if(tokenPost==undefined||tokenPost==null){
        res.status(200).json
        ({
            status:false,
            msg:"Invalid"
        })
        return;

    }
    var user=await tokenModel.findOne({token:tokenPost,status:"Active"});
    if(user==null||user==undefined){
        res.status(200).json
        ({
            status:false,
            msg:"Token not found"
        })
        return;
    }
    else{
        var data = await userModel.findOne({_id:user.userId,status:"Active"})
        
        if(data==null||data==undefined){
            res.status(200).json
            ({
                status:false,
                msg:"User not found"
            })
            return;
        }
        else{
            
        res.status(200).json
        ({
            status:true,
            msg:"user found",
            user:data
        })
        return;   
        }
    }
    }
    catch(e)
    {
        console.log(e);
    }
});

router.post('/eventApp/validateToken',async(req,res)=>{
    try{
    var {tokenPost}=req.body;

    console.log(tokenPost);
    if(tokenPost==undefined||tokenPost==null){
        res.status(200).json
        ({
            status:false,
            msg:"Invalid"
        })
        return;

    }
    var user=await tokenModel.findOne({token:tokenPost,status:"Active"});
    if(user==null||user==undefined){
        res.status(200).json
        ({
            status:false,
            msg:"Token not found"
        })
        return;
    }
    
    }
    catch(e)
    {
        console.log(e);
    }
});
router.post("/eventApp/verifyuser",adminAuth,async (req, res) => {
    try {
        res.status(200).json
        ({
            status:true,
            msg:"Sucess"
        })
        return;
    } catch (e) {
      console.log(e);
    }
  });

router.post("/eventApp/editEvent", adminAuth,async (req, res) => {
    try {

        var {name,host,fromDate,toDate,venue,id}=req.body;

       

        var data=await eventModel.findOne({_id:id});
        
        if(name!=undefined||name!=null){
            data.name=name;
        }
        

        data.host=host;
        data.fromDate=fromDate;
        data.toDate=toDate;
        data.venue=venue;
        await data.save()
        res.status(200).json
        ({
            status:true,
            name:name,
            host:host,
            fromDate:fromDate,
            toDate:toDate,
            venue:venue
        })
       

       
        return;
    } catch (e) {
      console.log(e);
    }
  });

  router.post("/eventApp/listEvent", adminAuth,async (req, res) => {
    try {
        var data=await eventModel.find({status:"Active"});
        
        res.status(200).json({
            status:true,
            data:data,
        })
       
        return;
    } catch (e) {
      console.log(e);
    }
  });  

  router.post("/eventApp/deleteEvent", adminAuth,async (req, res) => {
    try {

        var {id}=req.body;
        var data=await eventModel.findOne({_id:id});
        
        if(data!=undefined||data!=null){

            data.status="Deleted";
            
        }
        await data.save();

        res.status(200).json
        ({
            status:true,
            data:data
           
        })     
        return;
    } catch (e) {
      console.log(e);
    }
  });

  router.post("/eventApp/viewProfile", userAuth,async (req, res) => {
    try {
       var userId=req.user.user._id;
       var data =await userModel.findOne({_id:userId});
       res.status(200).json
       ({
           status:true,
           data:data
          
       })    
    } catch (e) {
      console.log(e);
    }
  });  

  router.post("/eventApp/viewProfile", userAuth,async (req, res) => {
    try {
       var userId=req.user.user._id;
       var data =await userModel.findOne({_id:userId});
       res.status(200).json
       ({
           status:true,
           data:data
          
       })    
    } catch (e) {
      console.log(e);
    }
  });

  router.post("/eventApp/listallevents", userAuth,async (req, res) => {
    try {
       
       var data =await eventModel.find({status:"Active"});
       res.status(200).json
       ({
           status:true,
           data:data
          
       })    
    } catch (e) {
      console.log(e);
    }
  });  

  router.post("/eventApp/date", userAuth,async (req, res) => {
    try {
       var today=new Date();
       var data =await eventModel.find({status:"Active",fromDate:{$gte:today}});
       res.status(200).json
       ({
           status:true,
           data:data   
       })    
    } catch (e) {
      console.log(e);
    }
  });

  router.post("/eventApp/eventBooking", userAuth,async (req, res) => {
    try {
       // var today=new date();
        var {name,eventId,noofseat,adult,childern,totalcount}=req.body
        var userId=req.user.user._id;

        var data=new eventBookingModel();

        data.name=name;
        data.userId=userId;
        data.eventId=eventId;
        data.noofseat=noofseat;
        data.adult=adult;
        data.childern=childern;
        data.totalcount=totalcount;
  await data.save();


        if(name==undefined||name==null){
            res.status(200).json
            ({
                status:false,
                msg:"Name is invalid"
            })
            return;
        }

       res.status(200).json
       ({
           status:true,
           data:data     
       })    
    } catch (e) {
      console.log(e);
    }
  });

  router.post("/event/evntlist",userAuth,async (req, res) => {
    try {
       var userId= req.user.user._id;
       const tdata =await eventBookingModel.find({userId:userId}).populate("userId");
       res.status(200).json
       ({
           status:true,
           data:tdata
       });    
    } catch (e) {
      console.log(e);
    }
  });

  
module.exports=router;
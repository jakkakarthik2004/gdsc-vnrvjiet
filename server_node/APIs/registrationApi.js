const exp = require("express");
const registrationApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
const getDBObj = require("./DBConnection");

require("dotenv").config();

registrationApp.use(exp.json());

registrationApp.put('/register',expressAsyncHandler(async(req,res)=>{
    let scannercollection = await getDBObj("scannerCollection");
    const newRegister = req.body;
    const dbuser = await scannercollection.findOne({email:newRegister.email});
    if(dbuser!==null)
        {
            if(dbuser.entered===false){
                res.send({message:"Allow To Workshop"})
                await scannercollection.updateOne({email:newRegister.email},{$set:{entered:true}});
            }
            else
            res.send({message:"Already Scanned Dont Allow to enter"})
        }
    else{
        console.log(newRegister);
        res.send({message:"Not registered for Workshop"});
    }
}
))

module.exports=registrationApp;
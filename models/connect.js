const mongoose=require('mongoose');
//asynchronus
mongoose.connect("mongodb://127.0.0.1:27017/mern9").then(()=>console.log("connection is established")).catch((err)=>console.log("err.message")) 

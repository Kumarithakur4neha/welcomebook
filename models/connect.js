const mongoose=require('mongoose');
//asynchronus

require('dotenv').config();

mongoose.connect("mongodb+srv://nehakumari0673949:neha444@cluster0.2coyw3n.mongodb.net/bookstore?retryWrites=true&w=majority&appName=Cluster0").then(()=> console.log("db connected")).catch((err)=>console.log(err))

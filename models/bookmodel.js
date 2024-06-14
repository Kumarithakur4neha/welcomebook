//to store data in data base 
const mongoose=require("mongoose")
const bookmodel=new mongoose.Schema({ //predefined function     
    name: String,
     image:String,
    authorname: String,
   bookprice: Number,
    quantity: Number,
    description:String
})
const Books=mongoose.model("book",bookmodel);  //in bookmodelall data gets save in book
module.exports=Books;
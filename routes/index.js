var express = require('express');
var router = express.Router();
const Books=require("../models/bookmodel");
 const upload=require("../utils/multer").single("image");
const fs=require("fs")
const path=require("path")


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get("/create",function(req,res,next){
  res.render("create")  
})  





router.post("/create", upload, async function (req, res, next) {
  try {
      const newbook = new Books({...req.body,image:req.file.filename });
      await newbook.save();
      res.redirect("/readall");
     
  } catch (error) {
      res.send(error);
  }
});



router.get("/readall",function(req,res,next){
  //res.render("library",{books:books})
  Books.find().then((books) =>{
    res.render("library",{books:books});
  })
  .catch((err) =>res.send(err));
})

router.get("/about",function(req,res,next){
  res.render("bookstore")
})




router.get("/delete/:id", async function (req, res, next) {
  try {
      const book = await Books.findByIdAndDelete(req.params.id);

      fs.unlinkSync(
          path.join(__dirname, "..", "public", "images", book.image)
      );

      res.redirect("/readall");
  } catch (error) {
      res.send(error);
  }
});




router.get("/update/:id",async function(req,res,next){
  try{
const book=await Books.findById(req.params.id);
res.render("update",{book:book})
  }
  catch(error){
    res.send(error)
  }
  // const i=req.params.index;
   //const b=books[i];
  //res.render("update",{book:b,index:i});
})     


  router.post("/update/:id", upload, async function (req, res, next) {
    try {
        const updateddata = { ...req.body };
        if (req.file) {
            updateddata.image = req.file.filename;
            fs.unlinkSync(
                path.join(
                    __dirname,
                    "..",
                    "public",
                    "images",
                    req.body.oldimage
                )
            );
        }

        await Books.findByIdAndUpdate(req.params.id, updateddata);
        res.redirect("/readall");
    } catch (error) {
        res.send(error);
    }
});

  //const i=req.params.index; 
  //books[i]=req.body;
  //res.redirect("/readall")

module.exports = router;

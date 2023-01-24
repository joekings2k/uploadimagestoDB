const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
require("dotenv/config");
const app = express();
const dbConnect = require("./dbconnect");
const multer = require("multer");
const imageMod = require("./imageMod");
const imageModel = imageMod.imageModel

app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static("Public"));
app.set("view engine", "ejs");


dbConnect();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

app.route("/")
  .get((req,res)=>{
    imageModel.find({},(err,items)=>{
      if(err){
        console.log(err);
        res.send(err.message)
      }else{
        res.render("imagesPages",{items:items})
      }
    })
  })
  .post(upload.single("image"),(req,res,next)=>{
    const obj ={
      name:req.body.name,
      desc:req.body.desc,
      img:{
        data:fs.readFileSync(path.join(__dirname+'/uploads/'+ req.file.filename)),
        contentType:'image/png'
      }
    }
    imageModel.create(obj,(err,items)=>{
      if(err){
        console.log(err)
      }else{
        res.redirect("/")
      }
    })
  })

app.listen(process.env.PORT, () => {
  console.log("server has started on port 3000");
});

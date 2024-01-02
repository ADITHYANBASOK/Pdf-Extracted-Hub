const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require("cors");

const UploadRouter = require('./Src/Routers/FileuploadRouter')




const app = express()
app.use(cors());
app.use("/files", express.static("files"));


app.use(express.urlencoded({extended:true}))
app.use(bodyParser())
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader( 
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });





app.use('/upload',UploadRouter)




const mongoDBurl = "mongodb+srv://adithyanbasok:12345@pdf.huhtp9n.mongodb.net/"

mongoose.connect(mongoDBurl).then(() => {
    app.listen(4000, () => { console.log("server started at http://localhost:4000"); })
}).catch((error) => {
    console.log(error);
})
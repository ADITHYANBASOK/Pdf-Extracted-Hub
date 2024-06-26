const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require("cors");
const dotenv = require('dotenv');


const UploadRouter = require('./Src/Routers/FileuploadRouter');
const ExtractRouter = require('./Src/Routers/ExtractFileRouter');
const SignUpRouter = require('./Src/Routers/SignUpRouter');
const LoginRouter = require('./Src/Routers/LoginRouter');

dotenv.config();


// Creating an Express app
const app = express()

// Enable CORS and serve files from the 'files' directory
app.use(cors({
  origin: 'https://pdf-extracted-hub-9a9j.vercel.app', // Replace with your frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // If you need to send cookies with requests
}));

app.use("/files", express.static("files"));


app.use(express.urlencoded({extended:true}))
app.use(bodyParser())

// CORS headers middleware to handle CORS headers
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




// Using routers for specific paths

app.use('/upload',UploadRouter)
app.use('/extract',ExtractRouter)
app.use('/Signup',SignUpRouter)
app.use('/login',LoginRouter)


// MongoDB connection URL

// Connecting to MongoDB and starting the server
mongoose.connect(process.env.MONGODB_URI).then(() => {
    app.listen(4000, () => { console.log("server started at http://localhost:4000"); })
}).catch((error) => {
    console.log(error);
})

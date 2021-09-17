const express = require('express');
const connectDB = require('./config/db');
// const dotenv = require("dotenv");
const app = express();
const mongoose = require('mongoose');

const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/post");
const categoryRoute = require("./routes/categories");

const multer = require("multer");
const Categories = require('./models/Categories');


// Connect Atlas cloud Database 
// connectDB();

//offline connection

const url = 'mongodb://localhost/Blog-api'


//connect db
mongoose.connect(url, {useNewUrlParser:true})

const con = mongoose.connection

con.on('open', () => {
    console.log('connected to db...');
})

// Init Middleware
// dotenv.config();
app.use(express.json());

// app.use("/", (req, res) => {
//     console.log("this is main url")
// });

const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null, "images")
    }, filename:(req,file,cb) => {
        cb(null,"hello.jpg")
    }
});

const upload = multer({storage: storage});
app.post("/api/upload", upload.single("file"),(req, res) => {
    res.status(200).json("File has been uploaded");
})

//routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

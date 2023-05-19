const express=require('express');
const app= express();
const dotenv=require('dotenv');
const mongoose = require('mongoose');
const authRouter=require('./routes/authRouter');
const userRouter=require('./routes/usersRouter');
const postRouter=require('./routes/postRouter');
// const categoryrouter=require('./controllers/categorysController');
const multer = require('multer');
const cors=require('cors');
const path = require('path');
const connectDB=require('./db/connect')
const notfoundMiddleware=require('./middleware/notFound')
const errorHandlerMiddleware=require('./middleware/error-handler')

dotenv.config();
app.use(express.json());

// Set the strictQuery option to false
mongoose.set('strictQuery', false);

// router
app.use('/api/auth',authRouter);
app.use('/api/users',userRouter);
app.use('/api/posts',postRouter);
// app.use('/api/categorys',categoryrouter);


// middleware
app.use(errorHandlerMiddleware)
app.use(notfoundMiddleware)
app.use(cors())
app.use('/Images',express.static(path.join(__dirname,"Images")))



// multer 
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'Images');
     },
    filename: function (req, file, cb) {
        cb(null , req.body.name);
    }
});

var upload = multer({ storage: storage })

app.post('/api/upload', upload.single('file') , (req, res) =>{
    try {
        res.status(200).json("File has been uploaded....")
    } catch(error) {
           res.status(500).json(err);
    }
});


// running server
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start()
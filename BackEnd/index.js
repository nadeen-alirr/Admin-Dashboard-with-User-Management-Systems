const express =require("express");
const app=express();
const mongoose = require('mongoose');
const port = process.env.PORT || 1336;
const helmet = require("helmet");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require('./Routes/user');


dotenv.config();
app.use(cors());
app.use(helmet());
app.use(express.json());


const DB = process.env.DB ;

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
  app.use('/api', userRoutes); 
  app.listen( port,()=>{
    console.log(`server run in port ${port}`);
 });

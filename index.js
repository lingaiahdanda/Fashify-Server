const express = require('express');
const app = express()
const dotenv = require("dotenv");
const connectDB = require('./config/db');
const userRoute = require('./routes/users');

dotenv.config();

// connect DB
connectDB();

//route
app.use('/api/user', userRoute);

app.listen(process.env.PORT || 5000, ()=>{
    console.log(`Our server is running at ${process.env.PORT}`);
})
const express = require('express');
const app = express()
const dotenv = require("dotenv");
const connectDB = require('./config/db');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
dotenv.config();

// connect DB
connectDB();

app.use(express.json());

//routes
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);

app.listen(process.env.PORT || 5000, ()=>{
    console.log(`Our server is running at ${process.env.PORT}`);
})
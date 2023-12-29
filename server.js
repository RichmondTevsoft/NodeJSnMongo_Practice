const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config(); //dotenv
const errorHandler = require('./middleware/errorMiddleware');
const connectDB = require('./config/db')
const port = process.env.PORT || 2500;


connectDB(); //Database connection

//routers
const paymentRoute = require('./routes/paymentRouters');
const goalRoute = require('./routes/goalRoutes');
const userRoute = require('./routes/userRoutes');


const app = express();  //initiialize express

app.use(express.json()); //Middleware to receive json
app.use(express.urlencoded({extended:false})) //Middleware to receive URL Enconded
 
app.use('/api/goals', goalRoute);
app.use('/api/users', userRoute);
app.use('/api/payments', paymentRoute);




app.use(errorHandler.errprHandler)

app.listen(port, () => console.log(`Server started on  ${port}`));
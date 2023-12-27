const express = require('express');
const dotenv = require('dotenv').config(); //dotenv
const errorHandler = require('./middleware/errorMiddleware');
const port = process.env.PORT || 2500;

//routers
const paymentRoute = require('./routes/paymentRouters');
const goalRoute = require('./routes/goalRoutes');


const app = express();  //initiialize express

app.use(express.json()); //Middleware to receive json
app.use(express.urlencoded({extended:false})) //Middleware to receive URL Enconded
 
app.use('/api/goals', goalRoute);
app.use('/api/payments', paymentRoute);




app.use(errorHandler.errprHandler)

app.listen(port, () => console.log(`Server started on  ${port}`));
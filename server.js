const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');

const connectDB = require('./config/db');

const storeRouter = require('./routes/storeRoutes');
const globalErrorHandler = require('./errorHandling/globalErrorHandler');

// load env variables
dotenv.config({path: './config/config.env'});

//connection to db
connectDB();

const app = express();

//body parser middleware to send data to api
app.use(express.json());

//enable cors
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/api/v1/stores', storeRouter);

app.use(globalErrorHandler);

const port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log(`server listening on port ${port} and running in ${process.env.NODE_ENV} environment`);
});
// Import the Express framework
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');


dotenv.config({path : 'config.env'});
const dbConnection = require('./config/database');
const categoryRoute = require('./routes/categoryRoute');

//connect with db
dbConnection();
// Create an Express application instance
const app = express();

//middelware
app.use(express.json()); //do persin from respons of postman

if(process.env.NODE_ENV == 'development'){
    app.use(morgan('dev'));
    console.log(`mode : ${process.env.NODE_ENV}`);
}
//Mount Route
app.use('/api/v1/categories',categoryRoute)

const PORT = process.env.PORT || 8000;
// Start the server, listening on port 8000
// Log "app running" to the console when the server starts
app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`);
})
// const mongoose = require('mongoose');
const dotenv = require('dotenv');
import {createConnection} from "typeorm";

dotenv.config({
    path: __dirname+'/config.env'
});

const server = require('./app');
const port = process.env.PORT;


process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION!!! shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});


// Create the database connection before we start our server
createConnection().then(() => {
// Start the server
    server.listen(port, () => {
        console.log(`Application is running on port ${port}`);
    });
  }).catch(() => {
    console.log("Couldn't connect to the database.")
  });




process.on('unhandledRejection', (err:any) => {
    console.log('UNHANDLED REJECTION!!!  shutting down ...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
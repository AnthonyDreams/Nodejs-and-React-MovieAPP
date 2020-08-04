import 'reflect-metadata';
import { useExpressServer } from "routing-controllers";
import {ActorController} from "./app/Controllers/actorController"
import {MovieController} from "./app/Controllers/movieController"
import {CharacterController} from "./app/Controllers/characterController"

import path from 'path';

const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');




const app = express();

// Allow Cross-Origin requests
app.use(cors());

// Set security HTTP headers
app.use(helmet());


// Body parser, reading data from body into req.body
app.use(express.urlencoded({extended: true,limit: '50mb'}));
app.use(express.json({
    limit: '50mb'
}));



// Data sanitization against XSS(clean user input from malicious HTML code)
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

//setting static files 
app.use('/static', express.static('public'));
app.use('/img',express.static(path.join(__dirname, 'public/uploads/images')));

// controllers

// register created express server in routing-controllers
useExpressServer(app, {
    // and configure it the way you need (controllers, validation, etc.)
    defaultErrorHandler: false,
    routePrefix: "/api",
    controllers: [ActorController, MovieController, CharacterController],
    middlewares: [__dirname + "/app/Middlewares/**/*.ts"], 
  });







module.exports = app;
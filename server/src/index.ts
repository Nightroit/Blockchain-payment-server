// Server specific imports
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
const cors = require('cors');

import mongoose from 'mongoose';
import userRoutes from './services/userRoutes';
import Service from './service';

dotenv.config();

const PORT = process.env.PORT || process.argv[2];
const app = express(); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(userRoutes)
if(process.env.MONGODB) {
    mongoose.connect(process.env.MONGODB).then(() => {
        console.log("connected to mongoose");
        app.listen(3010, () => {
            console.log("Listening at ", 3010); 
        })
    })
}

let servers = []; 

function buildNewServer(uniqueId: number) {
    servers.push(new Service(uniqueId))
}

export {buildNewServer}
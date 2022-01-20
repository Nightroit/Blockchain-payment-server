// Server specific imports
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
const cors = require('cors');

import mongoose from 'mongoose';
import userRoutes from './services/userRoutes';
import Service from './service';
import axios from 'axios';

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
let users:any = []; 
function buildNewServer(uniqueId: number) {
    servers.push(new Service(uniqueId))
    if(users.length >= 1) {
        axios.post('http://localhost:'+ users[users.length - 1] + '/register-and-broadcast-node',{
            nodeUrl: uniqueId.toString()
        })
    }
    users.push(uniqueId);
}

export {buildNewServer}
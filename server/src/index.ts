// Server specific imports
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
const cors = require('cors');

import mongoose from 'mongoose';
import userRoutes from './services/userRoutes';

dotenv.config();

const PORT = process.env.PORT || process.argv[2];
const app = express(); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(userRoutes)
if(process.env.MONGODB) {
    mongoose.connect(process.env.MONGODB).then(() => {
        console.log('mongoose connected')
        app.listen(3000, () => {
            console.log("Listening at ", 3000); 
        })
    })
}


for(let i = 1; i <= 4; i++) {
    //new Service(3000+i)
}
// Server specific imports
import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
const cors = require('cors');

// Importing routes 
import Routes from './services/routes'
import mongoose from 'mongoose';

dotenv.config();

const PORT = process.env.PORT || process.argv[2];
const app: Express = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


// Billi coin took birth <3

app.use(Routes)
let mongourl: any = process.env.MONGODB
//First connecting to mongodb
mongoose.connect(mongourl).then(data => {
    console.log("Connected to mongoose!"); 
    app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));
})
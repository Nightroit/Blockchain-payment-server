import bodyParser from 'body-parser';
import express from 'express'; 
import helmet from 'helmet';
import mongoose from 'mongoose';
import Router from './services/routes';
const cors = require('cors');

export default class Service {
    constructor(uniqueId: number) {
        var app = express();

        app.use(helmet());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(cors());


        // Billi coin took birth <3
        app.use((new Router((uniqueId).toString())).Routes)
        let mongourl: any = process.env.MONGODB
        //First connecting to mongodb
        mongoose.connect(mongourl).then(data => {
            console.log("Connected to mongoose!"); 
            app.listen(uniqueId, () => console.log(`Running on ${uniqueId} ⚡`));
        })
    }
}
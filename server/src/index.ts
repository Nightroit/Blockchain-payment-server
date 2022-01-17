// Server specific imports
import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
const cors = require('cors');

// Importing routes 
import Routes from './services/routes'
import mongoose from 'mongoose';
import Service from './service';
import Router from './services/routes';

dotenv.config();

const PORT = process.env.PORT || process.argv[2];

for(let i = 1; i <= 4; i++) {
    new Service(3000+i)
}
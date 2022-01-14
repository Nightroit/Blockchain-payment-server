// Blockchain specific imports
import { Blockchain } from './blockchain/blockchain';

// Server specific imports
import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Billi coin took birth <3
const billi = new Blockchain(); 


app.get('/', (req: Request, res: Response) => {
  res.status(400).json(billi);
});

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));
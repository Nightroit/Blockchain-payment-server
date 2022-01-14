// Blockchain specific imports
import Blockchain from '../blockchain/index'

// Server specific imports
import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { Block } from '../blockchain/types';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// Billi coin took birth <3
const billi = new Blockchain(); 
billi.createBlock(100, 'aa', 'bb'); 
billi.createTransaction(100, "asd-98sadjf-98", "sadf-98sadf-9a8sdfhj")
billi.createBlock(100, 'aa', 'bb'); 
const block: Block = {
    "index": 1,
    "date": 1642178733599,
    "transaction": [],
    "nonce": 100,
    "hash": "bb",
    "prev": "aa"
    }

const val = billi.createHash("asld;kfjasdfj", block, 100)



app.get('/', (req: Request, res: Response) => {
  res.status(400).json(billi);
});

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));
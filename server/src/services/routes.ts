import Blockchain from '../../blockchain/index'
import dotenv from 'dotenv';
import Express from 'express'; 
import axios from 'axios'; 
import { request } from 'http';

const PORT = process.env.PORT || process.argv[2];
const billi = new Blockchain(PORT); 
const block = {
    "index": 1,
    "date": 1642178733599,
    "transaction": [],
    "nonce": 100,
    "hash": "0",
    "prev": "0"
    }

const val = billi.createHash("asld;kfjasdfj", block, 100)

const Routes = Express.Router(); 
Routes.get('/', (req, res) => {
    res.redirect('/blockchain')
})

Routes.get('/blockchain', (req, res) => {
    res.json( billi)
})

Routes.post('/transaction', (req, res) => {
    const blockIndex = billi.createTransaction(req.body.amount, req.body.sender, req.body.recipient); 
    res.json({"Your transaction will be added at": blockIndex})
})  

Routes.post('/register-and-broadcast-node', (req, res) => {
    const url = req.body.nodeUrl;
    const requests:any = []; 

    if(billi.networkNodes.indexOf(url) == -1) {
        billi.networkNodes.forEach(node => {
            requests.push(axios.post('http://localhost:' + node + '/register-node', url))
        })
    } 

    Promise.all(requests).then(() => {  
        billi.networkNodes.push(url); 
        axios.post('http://localhost:' + url + '/register-node-bulk', {url: billi.currentNodeUrl}).then(() => {
            res.status(200).json({msg: "successful!"})
        })
    })

})

Routes.post('/register-node-bulk', (req, res) => {
    const url = req.body.url; 
    const requestPromise: any = []; 

    if(billi.networkNodes.indexOf(url) == -1) {
        billi.networkNodes.forEach(node => {
            requestPromise.push(axios.post('http://localhost:' + node + '/register-node', {url}))
        })
        
        Promise.all(requestPromise).then(() => {
            billi.networkNodes.push(url); 
            res.json({msg: "added!"})
        })
    } else {
        res.json({msg: "already exists!"})
    }
})

Routes.post('/register-node', (req, res) => {
    const url = req.body.url; 

    if(billi.networkNodes.indexOf(url) == -1) {
        billi.networkNodes.push(url); 
        axios.post('http://localhost:' + url + '/register-node', {url: billi.currentNodeUrl}).then(() => {
            res.send({msg: "done!"})
        })
    } else res.send({msg: "already exists!"})
})


Routes.post('/add-to-pending', (req, res) => {
    const transaction = billi.createTransaction(req.body.amount, req.body.sender, req.body.recipient); 
    billi.addTransactionToPendingTransaction(transaction); 
    console.log(billi.pendingTransactions)
    res.json({msg: "done"});
})

Routes.post('/transaction/broadcast', (req, res) => {
    const transaction = req.body; 
    const blockIndex = billi.addTransactionToPendingTransaction(transaction); 
    const requests:any = []; 
    billi.networkNodes.forEach((node) => {
        requests.push(axios.post('http://localhost:' + node + '/add-to-pending', transaction))
    })
    Promise.all(requests).then(() => {
        res.send(`The transaction will be added to the block${blockIndex}`);
    })
})

Routes.get('/mine', (req, res) => {

})

export default Routes; 
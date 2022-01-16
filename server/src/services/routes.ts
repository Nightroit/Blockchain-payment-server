import Blockchain from '../../blockchain/index'
import BlockchainModel from '../models/Blockchain';
import dotenv from 'dotenv';
import Express from 'express'; 
import axios from 'axios'; 
import mongoose from 'mongoose';
import { networkInterfaces } from 'os';
import loadData from '../util/loadData';
import updateDB from '../util/updateDB';

dotenv.config(); 

const PORT = process.env.PORT || process.argv[2];

var billi = new Blockchain(process.argv[2], 'endure', PORT);
var billiDB; 

const Routes = Express.Router(); 

console.log(process.env.MONGODB);
Routes.get('/', (req, res) => {
    // Searching for existing instance of user
    BlockchainModel
    .find({'userId': process.argv[2]}, function(err, data) {
        if(data.length != 0) {
            loadData(billi, data, function(err: object, done: boolean) {
                if(done) { 
                    axios.get('http://localhost:'+PORT + '/consensus').then(resp => {
                        res.json({updatedChain: resp.data.msg, billi});   
                    })
                 
                }
                else res.json({msg: "impossible!"})
              
            })
        } else {
            var obj = new BlockchainModel(JSON.parse(JSON.stringify(billi)));
            obj.save().then((data: any) => {  
                billiDB = obj;
            }); 
            res.json(billi)
        }
       
    }) 

})

Routes.get('/blockchain', (req, res) => {
    res.json(billi); 
})


Routes.post('/transaction', (req, res) => {
    const blockIndex = billi.createTransaction(req.body.amount, req.body.sender, req.body.recipient); 
    res.json({"Your transaction will be added at": blockIndex})
})  

Routes.post('/register-and-broadcast-node', (req, res) => {
    const url = req.body.nodeUrl;
    const requests:any = []; 
    console.log(billi); 
    if(billi.networkNodes.indexOf(url) == -1) {
        billi.networkNodes.forEach(node => {
            requests.push(axios.post('http://localhost:' + node + '/register-node', url))
        })
    } 

    Promise.all(requests).then(() => {  
        billi.networkNodes.push(url); 
        updateDB(billi, PORT, function(err: object, done: boolean) {
            if(done) {
                axios.post('http://localhost:' + url + '/register-node-bulk', {url: billi.currentNodeUrl}).then(() => {
                    res.status(200).json({msg: "successful!"})
                })
             } else {
                 res.status(400).json({msg: "something went wrong!"})
             }
        }); 
    })
})

Routes.post('/register-node-bulk', (req, res) => {
    const url = req.body.url; 
    const requestPromise: any = []; 

    if(billi.networkNodes.indexOf(url) == -1) {
        billi.networkNodes.forEach(node => {
            requestPromise.push(axios.post('http://localhost:' + node + '/register-node', {url}))
        })
        console.log("HERE"); 
        Promise.all(requestPromise).then(() => {
            billi.networkNodes.push(url);
            updateDB(billi, PORT, function(err: object, done: boolean) {
                if(done) {
                    res.json({msg: "added!"})
                }
                else res.json({msg: "something went wrong at register-node-broadcast"})
            }); 
        })
    } else {
        res.json({msg: "already exists!"});
    }
})

Routes.post('/register-node', (req, res) => {
    const url = req.body.url; 

    if(billi.networkNodes.indexOf(url) == -1) {
        billi.networkNodes.push(url);
        axios.post('http://localhost:' + url + '/register-node', {url: billi.currentNodeUrl}).then(() => {
            updateDB(billi, PORT, function(err: object, done: boolean) {
                if(done) {
                    res.json({msg: "added!"})
                }
                else res.json({msg: "something went wrong at register-node"})
            }); 
        })
    } else res.send({msg: "already exists!"});
})


Routes.post('/add-to-pending', (req, res) => {
    const transaction = billi.createTransaction(req.body.amount, req.body.sender, req.body.recipient); 
    billi.addTransactionToPendingTransaction(transaction); 
    updateDB(billi, PORT, function(err: object, done: boolean) {
        if(done) {
            res.json({msg: "added!"})
        }
       else res.json({msg: "something went wrong at add-to-pending"})
    });  

})

Routes.post('/transaction/broadcast', (req, res) => {
    const transaction = req.body; 
    const blockIndex = billi.addTransactionToPendingTransaction(transaction); 
    const requests:any = []; 
    billi.networkNodes.forEach((node) => {
        requests.push(axios.post('http://localhost:' + node + '/add-to-pending', transaction))
    })
    Promise.all(requests).then(() => {
        updateDB(billi, PORT, function(err: object, done: boolean) {
            if(done) {
                res.send(`The transaction will be added to the block${blockIndex}`);
            } else res.json({msg: "something went wrong at transaction/boradcast"})
        });  
    })
})

Routes.post('/mine', (req, res) => {
    const previous = billi.getLastBlock()['hash'];
    const currentBlock = {
        transaction: billi.pendingTransactions, 
        index: billi.getLastBlock()['index']+1
    }
    const hash = billi.miner(previous, currentBlock);
    res.setTimeout(120000, function() {
        res.send("Timeout!")
    })
    if(hash.hash.substr(0, 2) === '00') {
        billi.createBlock(hash.nonce, previous, hash.hash); 
        const requests: any = [];

        billi.networkNodes.forEach((node) => {
            requests.push(axios.post('http://localhost:' + node + '/broadcast-block', {nonce: hash.nonce, previous, hash: hash.hash}))
        })

        Promise.all(requests).then(() => {
            updateDB(billi, PORT, function(err: object, done: boolean) {
                if(done) {
                    res.json({msg: "done!"})
                }
                else res.json({msg: "something went wrong at mine"})
            });  
        })
    } else {
        res.json({msg: "Invalid hash"})
    }
})

Routes.post('/broadcast-block', (req, res) => {
    billi.createBlock(req.body.nonce, req.body.previous, req.body.hash);
    updateDB(billi, PORT, function(err: object, done: boolean) {
        if(done) {
            res.json({msg: "success"}); 
        }
        else res.json({msg: "something went wrong at broadcast-block"})
    });  
})

Routes.get('/consensus', (req, res) => {
    const requests:any = []; 

    billi.networkNodes.forEach((node) => {
        requests.push(axios.get('http://localhost:' + node + '/blockchain'))
    })
    // choosing the longest chain
    Promise.all(requests).then((ress) => {
        let longest = billi.chain, newBlock = false;

        ress.map(data => {
            if(data.length > longest.length) { 
                longest = data; 
                newBlock = true; 
            }
        })

        if(newBlock && billi.chainIsValid(longest)) {
            billi.chain = longest; 
            updateDB(billi, PORT, function(err: object, done: boolean) {
                if(done) {
                    res.json({msg: "YES"}); 
                }
                else res.json({msg: "something went wrong at broadcast-block"})
            }); 
        }
        else res.json({msg: "NO"})
        //longestChain(ress, billi.chain)
    })

})

Routes.get('/chain-validator', (req, res) => {
    const val = billi.chainIsValid(billi.chain); 
    res.json({msg: val})
})

export default Routes; 
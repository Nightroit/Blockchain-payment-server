import Blockchain from '../../blockchain/index'
import dotenv from 'dotenv';
import Express from 'express'; 
import axios from 'axios'; 
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
    billi.networkNodes.forEach(node => {
        axios.post('http://localhost:' + node + '/register-node', url)
        axios.post('http://localhost:' + url + '/register-node', node)
    })
    const currentNode = {
        url: billi.currentNodeUrl
    }
    axios.post('http://localhost:'+ url+'/register-node', currentNode)
    if(billi.networkNodes.indexOf(url) == -1) billi.networkNodes.push(url); 
    res.status(400).json({msg: "successful!"})
})

Routes.post('/register-node', (req, res) => {
    const url = req.body.url; 
    billi.networkNodes.push(url); 
})

Routes.get('/mine', (req, res) => {

})

export default Routes; 
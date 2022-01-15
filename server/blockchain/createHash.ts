import {Block, Hash} from './types';
import Blockchain from "./createTransaction";
const SHA256 = require("sha256");

Blockchain.prototype.createHash = function(prev: Hash, curr: any, nonce: number) {
    const dataAsStr = prev + nonce.toString() + JSON.stringify(curr); 
    const hash: Hash = SHA256(dataAsStr); 
    return hash;
};

Blockchain.prototype.miner = function(prev: Hash, curr: any) {
    let nonce = 0; 
    let hash = ""; 
    while(hash.substr(0, 2) != '00') {
        nonce++; 
        console.log("Mining.........",  nonce)
        hash = this.createHash(prev, curr, nonce);
    }
    console.log("Found at", nonce); 
    return {
        hash: hash, 
        nonce: nonce
    };
} 
export default Blockchain;
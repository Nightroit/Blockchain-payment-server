import {Block, Hash} from './types';
import Blockchain from "./createTransaction";
const SHA256 = require("sha256");

Blockchain.prototype.createHash = function(prev: Hash, curr: Block, nonce: number) {
    const dataAsStr = prev + nonce.toString() + JSON.stringify(curr); 
    const hash: Hash = SHA256(dataAsStr); 
    return hash;
};
export default Blockchain;
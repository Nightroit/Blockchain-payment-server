import { Hash, Block } from './types';
import Blockchain from './blockchain';

Blockchain.prototype.createBlock = function(nonce: number, previousBlock: Hash, hash: Hash) {
    const newBlock: Block = {
        index: this.chain.length + 1, 
        date: (new Date()).toString(), 
        transaction: this.pendingTransactions, 
        nonce: nonce,
        hash: hash,
        prev: previousBlock,
    };
    this.pendingTransactions = []; 
    this.chain.push(newBlock);
    return newBlock;
};

export default Blockchain;
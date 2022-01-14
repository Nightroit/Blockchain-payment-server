import {Blockchain} from './blockchain'
import {Block} from '../types'
Blockchain.prototype.createBlock = function(nonce, previousBlock, hash) {
    const newBlock: Block = {
        index: this.chain.length + 1, 
        date: Date.now(), 
        transaction: this.newTransaction, 
        nonce: nonce,
        hash: hash,
        prev: previousBlock,
    }
    this.newTransaction = []; 
    this.chain.push(newBlock)
    return newBlock
}
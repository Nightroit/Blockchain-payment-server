import {Block, Transaction,  Hash} from './types';

export default class Blockchain { 
    chain: Block[]; 
    newTransaction: Transaction[];
    createBlock: (nonce: number, previousBlock: Hash, hash: Hash) => void; 
    getLastBlock: () => Block; 
    createTransaction: (amount: number, sender: string, recipient: string) => number;
    createHash: (prev: Hash, curr: Block, nonce: number) => Hash;
    constructor() {
        this.chain = []; 
        this.newTransaction =  []; 
    }
}

Blockchain.prototype.getLastBlock = function() {
    return this.chain[this.chain.length-1]; 
}
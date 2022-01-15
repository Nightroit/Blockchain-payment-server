import {Block, Transaction,  Hash} from './types';

export default class Blockchain { 
    chain: Block[]; 
    newTransaction: Transaction[];
    currentNodeUrl: string; 
    networkNodes: string[]; 
    createBlock: (nonce: number, previousBlock: Hash, hash: Hash) => void; 
    getLastBlock: () => Block; 
    createTransaction: (amount: number, sender: string, recipient: string) => number;
    createHash: (prev: Hash, curr: Block, nonce: number) => Hash;
    constructor(url: string) {
        this.chain = []; 
        this.newTransaction =  []; 
        this.currentNodeUrl = url
        this.createBlock(1, '0', '0'); 
        this.networkNodes = []; 

    }
}

Blockchain.prototype.getLastBlock = function() {
    return this.chain[this.chain.length-1]; 
}
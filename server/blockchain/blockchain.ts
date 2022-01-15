import {Block, Transaction,  Hash} from './types';

export default class Blockchain { 
    chain: Block[]; 
    currentNodeUrl: string; 
    networkNodes: string[]; 
    pendingTransactions: Transaction[]; 
    createBlock: (nonce: number, previousBlock: Hash, hash: Hash) => void; 
    getLastBlock: () => Block; 
    createTransaction: (amount: number, sender: string, recipient: string) => Transaction;
    createHash: (prev: Hash, curr: Block, nonce: number) => Hash;
    addTransactionToPendingTransaction: (transaction: Transaction) => number; 
    constructor(url: string) {
        this.chain = []; 
        this.pendingTransactions = []; 
        this.currentNodeUrl = url
        this.networkNodes = []; 
        this.createBlock(1, '0', '0'); 

    }
}

Blockchain.prototype.getLastBlock = function() {
    return this.chain[this.chain.length-1]; 
}
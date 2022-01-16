import {Block, Transaction,  Hash} from './types';

export default class Blockchain { 
    userName: string; 
    userId: string; 
    chain: Block[]; 
    currentNodeUrl: string; 
    networkNodes: string[]; 
    pendingTransactions: Transaction[]; 
    date: string; 
    createBlock: (nonce: number, previousBlock: Hash, hash: Hash) => void; 
    getLastBlock: () => Block; 
    createTransaction: (amount: number, sender: string, recipient: string) => Transaction;
    createHash: (prev: Hash, curr: any, nonce: number) => Hash;
    addTransactionToPendingTransaction: (transaction: Transaction) => number; 
    chainIsValid: (blockchain: Block[]) => boolean; 
    miner: (prev: Hash, curr: any) => any;
   
    constructor(url: string, userName: string, userId: string) {
        this.chain = []; 
        this.pendingTransactions = []; 
        this.currentNodeUrl = url
        this.networkNodes = []; 
        this.createBlock(1, '0', '0'); 
        this.userName = userName; 
        this.userId = userId; 
    }
}

Blockchain.prototype.getLastBlock = function() {
    return this.chain[this.chain.length-1]; 
}
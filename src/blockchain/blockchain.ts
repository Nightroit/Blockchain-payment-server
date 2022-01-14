import {Block, Transaction,  Hash} from '../types'

export class Blockchain {
    chain: Block[]; 
    newTransaction: Transaction[];
    createBlock: (nonce: number, previousBlock: Block, hash: Hash) => void; 
    constructor() {
        this.chain = []; 
        this.newTransaction =  []; 
    }
}
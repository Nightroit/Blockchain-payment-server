import { Transaction } from "../types";
import Blockchain from "./createBlock";
Blockchain.prototype.createTransaction = function(amount: number, sender: string, recipient: string) {
    const transaction: Transaction = {
        amount, 
        sender, 
        recipient
    }
    this.newTransaction.push(transaction)
    return this.getLastBlock()['index']+1;
}

export default Blockchain
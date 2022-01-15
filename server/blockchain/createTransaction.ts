import { Transaction } from './types';
import Blockchain from './createBlock';
Blockchain.prototype.createTransaction = function(amount: number, sender: string, recipient: string): Transaction {
    const transaction: Transaction = {
        amount: amount, 
        sender: sender, 
        recipient: recipient
    };

    return transaction;
};

Blockchain.prototype.addTransactionToPendingTransaction = function(transaction: Transaction): number {
    this.pendingTransactions.push(transaction);
    return this.getLastBlock()['index']+1;
}

export default Blockchain;
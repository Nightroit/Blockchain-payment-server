import mongoose from 'mongoose'; 

const BlockchainSchema = new mongoose.Schema({
    userName: String,
    userId: String,
    chain: [{
        index: Number, 
        data: String, 
        transaction: [{
            amount: Number, 
            sender: String, 
            recipient: String
        }], 
        nonce: Number, 
        hash: String, 
        prev: String, 
    }], 
    pendingTransactions: [{
        amount: Number, 
        sender: String, 
        recipient: String
    }], 
    currentNodeUrl: String, 
    networkNodes: [String]
})

const BlockchainModel = mongoose.model('Chain', BlockchainSchema)
export default BlockchainModel; 
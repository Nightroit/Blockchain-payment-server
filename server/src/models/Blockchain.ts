import mongoose from 'mongoose'; 

const BlockchainSchema = new mongoose.Schema({
    updatedChain: String,
    userName: String,
    userId: String,
    chain: [{
        index: Number, 
        data: String, 
        transaction: [{
            amount: Number, 
            sender: String, 
            recipient: String, 
            _id: false
        }], 
        nonce: Number, 
        hash: String, 
        prev: String, 
        _id: false
    }], 
    pendingTransactions: [{
        amount: Number, 
        sender: String, 
        recipient: String, 
        _id: false, 
    }], 
    currentNodeUrl: String, 
    networkNodes: [String], 
   
})

const BlockchainModel = mongoose.model('Chain', BlockchainSchema)
export default BlockchainModel; 
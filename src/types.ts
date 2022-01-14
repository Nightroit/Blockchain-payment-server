export interface Transaction {

}

export interface Hash {

}

export interface Block {
    index: number, 
    date: number, 
    transaction: Transaction, 
    nonce: number, 
    hash: Hash, 
    prev: Block
}


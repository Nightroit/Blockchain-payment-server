export interface Transaction {
    amount: number, 
    sender: string, 
    recipient: string
}

export type Hash = string

export interface Block {
    index: number, 
    date: number, 
    transaction: Transaction[], 
    nonce: number, 
    hash: Hash, 
    prev: Hash
}


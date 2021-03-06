export interface Transaction {
    amount: number, 
    sender: string, 
    recipient: string
}

export type Hash = string

export interface Block {
    index: number, 
    date: string, 
    transaction: Transaction[], 
    nonce: number, 
    hash: Hash, 
    prev: Hash
}

export type Chain = Block[]; 

export interface UserData {
    userName: string, 
    email: string, 
    password: string, 
    confirmPassword: string, 
    uniqueId: number
}
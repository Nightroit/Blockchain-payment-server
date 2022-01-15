import {Chain } from "../types";

export default function(blockchain: Chain[], current: Chain) {
    let currentBlock = current;
    let newBlock = false; 
    blockchain.forEach((block) => {
        if(block.length > currentBlock.length) {
            currentBlock = block; 
            newBlock = true; 
        }
    })
    return {
        newBlock,
        block: currentBlock
    } 
}
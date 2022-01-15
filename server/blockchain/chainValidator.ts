import Blockchain from "./createHash";
import { Block } from "./types";

Blockchain.prototype.chainIsValid = function(blockchain: Block[]) {
	let validChain = true;

	for (var i = 1; i < blockchain.length; i++) {
		const currentBlock = blockchain[i];
		const prevBlock = blockchain[i - 1];
        const block = { transaction: currentBlock['transaction'], index: currentBlock['index'] }
		const blockHash = this.createHash(prevBlock['hash'], block, currentBlock['nonce']);
		if (blockHash.substring(0, 4) !== '0000') validChain = false;
		if (currentBlock['prev'] !== prevBlock['hash']) validChain = false;
	};

	const genesisBlock = blockchain[0];
	const correctNonce = genesisBlock['nonce'] === 1;
	const correctPreviousBlockHash = genesisBlock['prev'] === '0';
	const correctHash = genesisBlock['hash'] === '0';
	const correctTransactions = genesisBlock['transaction'].length === 0;

	if (!correctNonce || !correctPreviousBlockHash || !correctHash || !correctTransactions) validChain = false;

	return validChain;
};


export default Blockchain;
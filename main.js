const SHA256 = require('crypto-js/sha256')
class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this .data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.index  + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, "12/22/2017", "Genesis Block", "0")
    }
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
    isChainValid() {
        for(let i=1; i< this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            if(currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

let sudhirCoin = new Blockchain();
sudhirCoin.addBlock(new Block(1, "12/23/2017", {amount: 4}));
sudhirCoin.addBlock(new Block(2, "12/24/2017", {amount: 12}));

console.log(JSON.stringify(sudhirCoin, null, 4));
console.log('Is block chain valid?'+sudhirCoin.isChainValid());

sudhirCoin.chain[1].data = { amount: 100 };
sudhirCoin.chain[1].hash = sudhirCoin.chain[1].calculateHash();


console.log('Is block chain valid?'+sudhirCoin.isChainValid());


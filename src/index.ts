import * as CryptoJS from 'crypto-js';

interface IBlock {
  index: number;
  timestamp: number;
  data: any;
  previousHash: string;
}

export class Block {
  public index: number;
  public timestamp: number;
  public data: any;
  public previousHash: string;
  public hash: string;

  constructor({ index, timestamp, data, previousHash }: IBlock) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  public calculateHash(): string {
    return CryptoJS.SHA256(
      this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash
    ).toString();
  }
}

export class Blockchain {
  public chain: Block[];

  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  public createGenesisBlock(): Block {
    return new Block({ index: 0, timestamp: Date.now(), data: 'Genesis Block', previousHash: '0' });
  }

  public getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  public addBlock(newBlock: Block): void {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  public isChainValid(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}

export class NanoChain extends Blockchain {
  public addBlock(newBlock: Block): void {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();

    if (this.isChainValid() && this.chain.length <= 10) {
      this.chain.push(newBlock);
    } else {
      console.log('Chain is too long or not valid. Cannot add new block.');
    }
  }
}

const myNanoChain = new NanoChain();

console.log('Mining block 1...');
myNanoChain.addBlock(
  new Block({ index: 1, timestamp: Date.now(), data: { amount: 4 }, previousHash: '' })
);

console.log('Mining block 2...');
myNanoChain.addBlock(
  new Block({ index: 2, timestamp: Date.now(), data: { amount: 10 }, previousHash: '' })
);

console.log('Mining block 3...');
myNanoChain.addBlock(
  new Block({ index: 3, timestamp: Date.now(), data: { amount: 20 }, previousHash: '' })
);

console.log('Mining block 4...');
myNanoChain.addBlock(
  new Block({ index: 4, timestamp: Date.now(), data: { amount: 30 }, previousHash: '' })
);

console.log('Mining block 5...');
myNanoChain.addBlock(
  new Block({ index: 5, timestamp: Date.now(), data: { amount: 40 }, previousHash: '' })
);

console.log('Mining block 6...');
myNanoChain.addBlock(
  new Block({ index: 6, timestamp: Date.now(), data: { amount: 50 }, previousHash: '' })
);

console.log('Mining block 7...');
myNanoChain.addBlock(
  new Block({ index: 7, timestamp: Date.now(), data: { amount: 60 }, previousHash: '' })
);

console.log('Mining block 8...');
myNanoChain.addBlock(
  new Block({ index: 8, timestamp: Date.now(), data: { amount: 70 }, previousHash: '' })
);

console.log('Mining block 9...');
myNanoChain.addBlock(
  new Block({ index: 9, timestamp: Date.now(), data: { amount: 80 }, previousHash: '' })
);

console.log('Mining block 10...');
myNanoChain.addBlock(
  new Block({ index: 10, timestamp: Date.now(), data: { amount: 90 }, previousHash: '' })
);

console.log('Mining block 11...');
//chain will be to long
myNanoChain.addBlock(
  new Block({ index: 11, timestamp: Date.now(), data: { amount: 100 }, previousHash: '' })
);

console.log('Nanochain: ' + JSON.stringify(myNanoChain, null, 4));

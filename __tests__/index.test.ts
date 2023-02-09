import { Block, Blockchain } from '../src/index';

describe('Block', () => {
  const index = 1;
  const timestamp = Date.now();
  const previousHash = '';
  const hash = 'bar-hash';
  const data = ['blockchain', 'data'];
  const block = new Block({ index, timestamp, previousHash, data });

  it('has a index, timestamp, previousHash and data property', () => {
    expect(block.index).toEqual(index);
    expect(block.timestamp).toEqual(timestamp);
    expect(block.previousHash).toEqual(previousHash);
    expect(block.data).toEqual(data);
  });
});

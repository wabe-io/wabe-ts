import { describe, it } from 'mocha';
import * as chai from 'chai';
import { MemKVStorage } from '../memKvStorage';

const expect = chai.expect;

let storage: MemKVStorage;

beforeEach((done) => {
  storage = new MemKVStorage();
  done();
});

describe('memKvStorage', () => {
  it('can retrieve a collection', async () => {
    const col = await storage.getCollection('foo');
    expect(col).to.be.not.null;
  });

  it('can retrieve the same collection', async () => {
    const col1 = await storage.getCollection('foo');
    await col1.setValue('bar', 'xxx');
    const col2 = await storage.getCollection('foo');
    expect(await col2.findByKey('bar')).to.eq('xxx');
  });
});

describe('memKvStorageCollection', () => {
  it('can save and retrieve a string', async () => {
    const col = await storage.getCollection('foo');
    await col.setValue('bar', 'val1');
    const val = await col.findByKey('bar');
    expect(val).to.eq('val1');
  });

  it('can overwrite a string', async () => {
    const col = await storage.getCollection('foo');
    await col.setValue('bar', 'val1');
    await col.setValue('bar', 'val2');
    const val = await col.findByKey('bar');
    expect(val).to.eq('val2');
  });

  it('returns null when a key is not present', async () => {
    const col = await storage.getCollection('foo');
    const val = await col.findByKey('bar');
    expect(val).to.be.null;
  });

  it('can delete a key', async () => {
    const col = await storage.getCollection('foo');
    await col.setValue('bar', 'something');
    await col.dropByKey('bar');
    const val = await col.findByKey('bar');
    expect(val).to.be.null;
  });

  it('can drop all items', async () => {
    const col = await storage.getCollection('foo');
    await col.setValue('bar', 'something');
    await col.setValue('baz', 'something');
    await col.emptyCollection();
    expect(await col.findByKey('bar')).to.be.null;
    expect(await col.findByKey('baz')).to.be.null;
  });

  it('returns an empty array', async () => {
    const col = await storage.getCollection('foo');
    const keys = await col.getAllKeys();
    expect(keys.length).to.eq(0);
  });

  it('can retrieve all keys', async () => {
    const col = await storage.getCollection('foo');
    await col.setValue('bar', 'something');
    await col.setValue('baz', 'something2');
    await col.setValue('bax', 'something3');
    const keys = await col.getAllKeys();
    expect(keys.length).to.eq(3);
    expect(keys).to.include('bar');
    expect(keys).to.include('baz');
    expect(keys).to.include('bax');
  });
});

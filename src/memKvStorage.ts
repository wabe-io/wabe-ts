import { KVStorage, KVStorageCollection } from './kvStorage';

export class MemKVStorageCollection implements KVStorageCollection {
  data: { [key: string]: string } = {};

  findByKey = async (key: string): Promise<null | string> => {
    return this.data[key] || null;
  };

  dropByKey = async (key: string): Promise<void> => {
    delete this.data[key];
  };

  setValue = async (key: string, value: string): Promise<void> => {
    this.data[key] = value;
  };

  emptyCollection = async (): Promise<void> => {
    this.data = {};
  };

  getAllKeys = async (): Promise<string[]> => {
    return Object.keys(this.data);
  };
}

export class MemKVStorage implements KVStorage {
  collections: { [key: string]: KVStorageCollection } = {};

  getCollection = async (name: string): Promise<KVStorageCollection> => {
    let col = this.collections[name];

    if (col == null) {
      col = new MemKVStorageCollection();
      this.collections[name] = col;
    }

    return col;
  };
}

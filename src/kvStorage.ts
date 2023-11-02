/**
 * Simple interface for a key-value storage
 */

export interface KVStorage {
  getCollection: (name: string) => Promise<KVStorageCollection>;
}

export interface KVStorageCollection {
  findByKey: (key: string) => Promise<null | string>;
  dropByKey: (key: string) => Promise<void>;
  setValue: (key: string, value: string) => Promise<void>;
  emptyCollection: () => Promise<void>;
  getAllKeys: () => Promise<string[]>;
}

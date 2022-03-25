declare type StorageFactory = {
    storage: Storage;
    get(key: string): unknown;
    has(key: string): boolean;
    set(key: string, value: unknown): void;
    remove(key: string): void;
};
declare const storageFactory: StorageFactory;
export default storageFactory;

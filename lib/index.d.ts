declare type StorageConfig = {
    driver: 'localStorage' | 'sessionStorage';
    name: string;
};
declare type StorageFactory = {
    storage: Storage;
    get(key: string): any;
    has(key: string): boolean;
    set(key: string, value: unknown): void;
    remove(key: string): void;
};
declare function createInstance({ driver, name }: StorageConfig): StorageFactory;
export default createInstance;

type StorageConfig = {
  driver: 'localStorage' | 'sessionStorage';
  name: string;
};

type StorageFactory = {
  storage: Storage;
  get(key: string): unknown;
  has(key: string): boolean;
  set(key: string, value: unknown): void;
  remove(key: string): void;
};

function createInstance({ driver, name }: StorageConfig): StorageFactory {
  if (typeof window === 'undefined') {
    throw new Error('cannot access localStorage outside of a browser');
  }

  const storage: Storage = window[driver];
  const prefix = `${name}/`;

  return {
    storage,

    get(key: string): unknown {
      let result;

      try {
        result = storage.getItem(`${prefix}${key}`);
      } catch (err) {
        result = null;
      }

      if (result) {
        result = JSON.parse(result);
      }

      return result;
    },

    has(key: string): boolean {
      let result;

      try {
        result = storage.getItem?.(`${prefix}${key}`);
      } catch (err) {
        console.error(driver, err);
      }

      return result !== null;
    },

    set(key: string, value: unknown): void {
      const sanitised = JSON.stringify(value);

      try {
        storage.setItem(`${prefix}${key}`, sanitised);
      } catch (err) {
        console.error(driver, err);
      }
    },

    remove(key: string): void {
      try {
        storage.removeItem(`${prefix}${key}`);
      } catch (err) {
        console.error(driver, err);
      }
    },
  };
}

const storageFactory: StorageFactory = Object.assign(createInstance);
export default storageFactory;

type StorageConfig = {
  driver: 'localStorage' | 'sessionStorage';
  name: string;
};

type StorageFactory = {
  storage: Storage;
  get(key: string): any;
  has(key: string): boolean;
  set(key: string, value: unknown): void;
  remove(key: string): void;
};

function createInstance({ driver, name }: StorageConfig): StorageFactory {
  let storage: any;

  try {
    storage = typeof window === 'undefined' ? {} : window[driver];
  } catch (error) {
    console.error(driver, error);
  }

  const prefix = `${name}/`;
  return {
    storage,

    get(key: string): any {
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

export default createInstance;

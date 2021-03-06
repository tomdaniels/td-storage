# td-storage [![npm version](https://badge.fury.io/js/td-storage.svg)](https://badge.fury.io/js/td-storage)

Helper functions to access local storage, wrapped in try catches and JSON parsing taken care of.

## Install

```bash
yarn add td-storage
```

## Configuration

Support for both `localStorage` and `sessionStorage`.

```javascript
import storageFactory from 'td-storage';

const store = storageFactory({
  driver: 'localStorage', // 'sessionStorage'
  name: 'my-cool-app',
});

/**
 * each instance of the storageFactory is prefixed with the provided name
 * i.e the below will be stored under "my-cool-app/my-key"
 */
store.set(key, 'any value'); // => void
```

## Methods (has, get, set, remove)

```javascript
const key = 'my-key';

store.has(key); // => false
store.get(key); // => null

store.set(key, 'any value'); // => void
store.has(key); // => true
store.get(key); // => 'any value'

store.remove(key); // => void
store.get(key); // => null
```

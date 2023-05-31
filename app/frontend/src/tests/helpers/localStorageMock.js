// How to use a mock localStorage in tests?
// https://robertmarshall.dev/blog/how-to-mock-local-storage-in-jest-tests/

const localStorageMock = (function mock() {
  let store = {};

  return {
    getItem(key) {
      return store[key];
    },

    setItem(key, value) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key) {
      delete store[key];
    },

    getAll() {
      return store;
    },
  };
}());

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

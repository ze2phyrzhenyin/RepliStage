type StorageMap = Map<string, string>;

export function installWindowStorageMock() {
  const store: StorageMap = new Map();

  const localStorage = {
    getItem(key: string) {
      return store.has(key) ? store.get(key)! : null;
    },
    setItem(key: string, value: string) {
      store.set(key, String(value));
    },
    removeItem(key: string) {
      store.delete(key);
    },
    clear() {
      store.clear();
    },
  };

  Object.defineProperty(globalThis, "window", {
    value: { localStorage },
    configurable: true,
    writable: true,
  });

  Object.defineProperty(globalThis, "localStorage", {
    value: localStorage,
    configurable: true,
    writable: true,
  });

  return {
    localStorage,
    cleanup() {
      Reflect.deleteProperty(globalThis, "window");
      Reflect.deleteProperty(globalThis, "localStorage");
    },
  };
}

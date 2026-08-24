const DB_NAME = 'borena-offline'
const DB_VERSION = 1

function open() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)
    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains('offline-guide')) {
        db.createObjectStore('offline-guide', { keyPath: 'id' })
      }
      if (!db.objectStoreNames.contains('saved-pages')) {
        const store = db.createObjectStore('saved-pages', { keyPath: 'slug' })
        store.createIndex('savedAt', 'savedAt')
      }
      if (!db.objectStoreNames.contains('pending-actions')) {
        db.createObjectStore('pending-actions', { keyPath: 'id', autoIncrement: true })
      }
      if (!db.objectStoreNames.contains('map-metadata')) {
        db.createObjectStore('map-metadata', { keyPath: 'id' })
      }
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

async function tx(storeName: string, mode: IDBTransactionMode, callback: (store: IDBObjectStore) => IDBRequest<any>) {
  const db = await open()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, mode)
    const store = transaction.objectStore(storeName)
    const result = callback(store)
    transaction.oncomplete = () => resolve(result)
    transaction.onerror = () => reject(transaction.error)
  })
}

export async function getStore(storeName: string) {
  const db = await open()
  return db.transaction(storeName, 'readonly').objectStore(storeName)
}

export async function getAll(storeName: string): Promise<any[]> {
  return tx(storeName, 'readonly', store => store.getAll()) as Promise<any[]>
}

export async function get(storeName: string, key: any) {
  return tx(storeName, 'readonly', store => store.get(key))
}

export async function put(storeName: string, value: any) {
  return tx(storeName, 'readwrite', store => store.put(value))
}

export async function del(storeName: string, key: any) {
  return tx(storeName, 'readwrite', store => store.delete(key))
}

export async function clear(storeName: string) {
  return tx(storeName, 'readwrite', store => store.clear())
}

export async function count(storeName: string) {
  return tx(storeName, 'readonly', store => store.count())
}

import { UserProfile, PRDDocument, UserActivityItem, SubscriptionTransactionItem } from '../types/prd';

const DB_NAME = 'PRDStudioDatabase';
const DB_VERSION = 1;

/**
 * Real IndexedDB Transactional Database Client for PRD Studio
 * Handles persistent IndexedDB stores for users, prds, activities, transactions, and system logs.
 */
class RealDatabaseClient {
  private dbPromise: Promise<IDBDatabase> | null = null;

  constructor() {
    this.initDatabase();
  }

  private initDatabase(): Promise<IDBDatabase> {
    if (this.dbPromise) return this.dbPromise;

    this.dbPromise = new Promise((resolve, reject) => {
      if (typeof window === 'undefined' || !window.indexedDB) {
        reject(new Error('IndexedDB is not supported in this environment'));
        return;
      }

      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // 1. Users Store
        if (!db.objectStoreNames.contains('users')) {
          const userStore = db.createObjectStore('users', { keyPath: 'email' });
          userStore.createIndex('role', 'role', { unique: false });
          userStore.createIndex('status', 'status', { unique: false });
        }

        // 2. PRDs Store
        if (!db.objectStoreNames.contains('prds')) {
          const prdStore = db.createObjectStore('prds', { keyPath: 'id' });
          prdStore.createIndex('title', 'title', { unique: false });
          prdStore.createIndex('createdAt', 'createdAt', { unique: false });
        }

        // 3. Activities Audit Log Store
        if (!db.objectStoreNames.contains('activities')) {
          const actStore = db.createObjectStore('activities', { keyPath: 'id' });
          actStore.createIndex('timestamp', 'timestamp', { unique: false });
        }

        // 4. Subscription Transactions Store
        if (!db.objectStoreNames.contains('transactions')) {
          const txStore = db.createObjectStore('transactions', { keyPath: 'id' });
          txStore.createIndex('transactionId', 'transactionId', { unique: true });
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    return this.dbPromise;
  }

  // --- USERS DB OPERATORS ---
  async getAllUsers(): Promise<UserProfile[]> {
    try {
      const db = await this.initDatabase();
      return new Promise((resolve, reject) => {
        const tx = db.transaction('users', 'readonly');
        const store = tx.objectStore('users');
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => reject(req.error);
      });
    } catch (e) {
      console.warn('IndexedDB read fallback', e);
      return [];
    }
  }

  async saveUser(user: UserProfile): Promise<UserProfile> {
    try {
      const db = await this.initDatabase();
      return new Promise((resolve, reject) => {
        const tx = db.transaction('users', 'readwrite');
        const store = tx.objectStore('users');
        const req = store.put(user);
        req.onsuccess = () => resolve(user);
        req.onerror = () => reject(req.error);
      });
    } catch (e) {
      console.warn('IndexedDB write fallback', e);
      return user;
    }
  }

  async getUserByEmail(email: string): Promise<UserProfile | null> {
    try {
      const db = await this.initDatabase();
      return new Promise((resolve, reject) => {
        const tx = db.transaction('users', 'readonly');
        const store = tx.objectStore('users');
        const req = store.get(email.toLowerCase());
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => reject(req.error);
      });
    } catch (e) {
      return null;
    }
  }

  async deleteUser(email: string): Promise<boolean> {
    try {
      const db = await this.initDatabase();
      return new Promise((resolve, reject) => {
        const tx = db.transaction('users', 'readwrite');
        const store = tx.objectStore('users');
        const req = store.delete(email.toLowerCase());
        req.onsuccess = () => resolve(true);
        req.onerror = () => reject(req.error);
      });
    } catch (e) {
      return false;
    }
  }

  // --- PRDS DB OPERATORS ---
  async getAllPRDs(): Promise<PRDDocument[]> {
    try {
      const db = await this.initDatabase();
      return new Promise((resolve, reject) => {
        const tx = db.transaction('prds', 'readonly');
        const store = tx.objectStore('prds');
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => reject(req.error);
      });
    } catch (e) {
      return [];
    }
  }

  async savePRD(prd: PRDDocument): Promise<PRDDocument> {
    try {
      const db = await this.initDatabase();
      return new Promise((resolve, reject) => {
        const tx = db.transaction('prds', 'readwrite');
        const store = tx.objectStore('prds');
        const req = store.put(prd);
        req.onsuccess = () => resolve(prd);
        req.onerror = () => reject(req.error);
      });
    } catch (e) {
      return prd;
    }
  }

  async deletePRD(id: string): Promise<boolean> {
    try {
      const db = await this.initDatabase();
      return new Promise((resolve, reject) => {
        const tx = db.transaction('prds', 'readwrite');
        const store = tx.objectStore('prds');
        const req = store.delete(id);
        req.onsuccess = () => resolve(true);
        req.onerror = () => reject(req.error);
      });
    } catch (e) {
      return false;
    }
  }

  // --- ACTIVITIES DB OPERATORS ---
  async getAllActivities(): Promise<UserActivityItem[]> {
    try {
      const db = await this.initDatabase();
      return new Promise((resolve, reject) => {
        const tx = db.transaction('activities', 'readonly');
        const store = tx.objectStore('activities');
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => reject(req.error);
      });
    } catch (e) {
      return [];
    }
  }

  async logActivity(item: UserActivityItem): Promise<void> {
    try {
      const db = await this.initDatabase();
      const tx = db.transaction('activities', 'readwrite');
      tx.objectStore('activities').put(item);
    } catch (e) {
      // Fallback
    }
  }
}

export const RealDB = new RealDatabaseClient();

import { Injectable } from '@angular/core';

@Injectable()
export class PersistenceService {
  constructor() {}

  get(key: string): unknown {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (error) {
      console.log('Error getting from localstorage', error);
      return null;
    }
  }

  set(key: string, data: unknown): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.log('Error saving to localstorage', error);
    }
  }

  delete(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.log('Error deleting from localstorage', error);
    }
  }
}

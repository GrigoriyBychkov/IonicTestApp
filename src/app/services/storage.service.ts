import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storagePromise;
  private appStorage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    this.storagePromise = this.storage.create();
    this.appStorage = await this.storagePromise;
  }

  public async set(key: string, value: any) {
    await this.storagePromise;
    this.appStorage?.set(key, value);
  }

  public async get(key: string) {
    await this.storagePromise;
    return this.appStorage?.get(key);
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IProduct} from '../Interfaces/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getProductsList(): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>('/assets/data.json');
  }
}

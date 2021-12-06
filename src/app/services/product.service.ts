import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IProduct} from '../Interfaces/iproduct';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getProductsList(searchTerm: string): Observable<IProduct[]> {
    searchTerm = searchTerm.toLowerCase();

    // фильтруем мок данные вместо бекенда
    return this.httpClient.get<IProduct[]>('/assets/data.json')
      .pipe(map((items: IProduct[]) => {
        return items.filter((item) => {
          return item.title.toLowerCase().indexOf(searchTerm) > -1;
        });
      }));
  }
}

import { Component, OnInit } from '@angular/core';
import {IProduct} from '../Interfaces/iproduct';
import {Router} from '@angular/router';
import {ProductService} from '../services/product.service';
import {FormControl, FormGroup} from '@angular/forms';
import {takeUntil} from 'rxjs/operators';
import {BaseComponent} from '../shared/base.component';
import {StorageService} from '../services/storage.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage extends BaseComponent implements OnInit  {
  list: IProduct[];

  searchForm = new FormGroup({
    word: new FormControl(''),
  });

  constructor(
    private route: Router,
    private productService: ProductService,
    private storageService: StorageService
  ) {
    super();
  }

  async ngOnInit() {
    const word = await this.storageService.get('searchWord');
    if (word) {
      this.searchForm.patchValue({
        word
      });
      this.getList(word);
    } else {
      this.getList('');
    }

    this.searchForm.get('word').valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((val: string) => {
        this.getList(val);
      });
  }

  async getList(searchTerm: string) {
    // this.storageService.set('searchWord', searchTerm);

    this.list = await this.productService.getProductsList(searchTerm).toPromise();

    await this.storageService.set('searchWord', searchTerm);
  }

  openProduct(item: IProduct) {
    this.route.navigate(['/product/'], {
      queryParams: {
        data: JSON.stringify(item)
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import {IProduct} from '../Interfaces/iproduct';
import {Router} from '@angular/router';
import {ProductService} from '../services/product.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  list: IProduct[];

  constructor(
    private route: Router,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.getList();
  }
  async getList() {
    this.list = await this.productService.getProductsList().toPromise();
  }

  openProduct(item: IProduct) {
    this.route.navigate(['/product/'], {
      queryParams: {
        data: JSON.stringify(item)
      }
    });
  }
}

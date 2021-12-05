import {Component, OnDestroy, OnInit} from '@angular/core';
import {IProduct} from '../Interfaces/iproduct';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit, OnDestroy {
  data: IProduct;
  constructor(
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.initSubscription();
  }
  ngOnDestroy() {
    this.route.queryParams.subscribe();
  }

  private initSubscription() {
    this.route.queryParams.subscribe(params => {
      if (params.data) {
        this.data = JSON.parse(params.data);
        console.log(this.data);
      }
    });
  }
}

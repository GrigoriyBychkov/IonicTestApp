import {Component, OnDestroy, OnInit} from '@angular/core';
import {IProduct} from '../Interfaces/iproduct';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {BaseComponent} from '../shared/base.component';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage extends BaseComponent implements OnInit {
  data: IProduct;
  form: FormGroup = new FormGroup({
    amount: new FormControl(''),
    quantity: new FormControl('')
  });

  constructor(
    private route: ActivatedRoute,
  ) {
    super();
  }

  ngOnInit() {
    this.initSubscription();

    this.route.queryParams
      .pipe(takeUntil(this.destroyed$))
      .subscribe(params => {
        if (params.data) {
          this.data = JSON.parse(params.data);
        }
      });
  }

  buttonsAmount(amount: number) {
    this.form.patchValue({
      amount
    });
  }

  buttonsQuantity(quantity: number) {
    this.form.patchValue({
      quantity
    });
  }

  private initSubscription() {
    this.form.get('amount').valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((amount => {
        amount = amount > -1 ? amount : 0;
        const quantity = (Math.round((amount / this.data.price) * 100) / 100);
        this.form.patchValue({quantity}, {emitEvent: false});
      }));

    this.form.get('quantity').valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((quantity => {
        const amount = (Math.round((quantity * this.data.price) * 100) / 100);
        this.form.patchValue({amount}, {emitEvent: false});
      }));
  }


}

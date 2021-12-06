import {Subject} from 'rxjs';
import {Injectable, OnDestroy} from '@angular/core';

@Injectable()
export abstract class BaseComponent implements OnDestroy {
  protected destroyed$ = new Subject<any>();
  protected constructor() {}

  ngOnDestroy(): void {
    this.destroyed$.next({});
    this.destroyed$.complete();
    this.onDestroy();
  }

  protected onDestroy(): void {}
}

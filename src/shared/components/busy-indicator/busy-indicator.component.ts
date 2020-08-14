import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BusyIndicatorService } from './service/busy-indicator.service';

@Component({
  selector: 'busy-indicator',
  template: `
    <div class="busyIndicator busyIndicator--withOverlay is-shown" *ngIf="show">
      <div class="busyIndicator__ring busyIndicator__ring--medium"></div>
      <div class="busyIndicator__overlay"></div>
    </div>
  `,
})
export class BusyIndicatorComponent implements OnInit, OnDestroy {
  show: boolean;
  busy$: Subscription;
  constructor(private busyIndicatorService: BusyIndicatorService) {}

  ngOnInit(): void {
    this.busy$ = this.busyIndicatorService
      .subscribeToState()
      .subscribe((resp: boolean) => (this.show = resp));
  }
  ngOnDestroy(): void {
    this.busy$.unsubscribe();
  }
}

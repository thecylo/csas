import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BusyIndicatorService {
  private $busySubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  show() {
    this.$busySubject.next(true);
  }

  hide() {
    this.$busySubject.next(false);
  }

  subscribeToState(): Observable<boolean> {
    return this.$busySubject.asObservable();
  }
}

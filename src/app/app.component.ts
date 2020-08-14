import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styles: ['.layout {position: fixed; top: 6rem; left: 0, z-index: 1}', 'p-toast{z-index: 99999}'],
  template: `
    <app-bar></app-bar>

    <div class="appWrapper">
      <div
        class="appWrapper__regions has-appBar has-contextRegion has-leadingRegion appWrapper__regions--pushLayout"
      >
        <app-notification></app-notification>
        <section class="mainRegion">
          <busy-indicator></busy-indicator>
          <router-outlet></router-outlet>
        </section>
      </div>
    </div>
  `,
})
export class AppComponent {}

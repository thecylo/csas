import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bar',
  styles: [
    '.bar{position: fixed;top: 0;left: 0;width: 100%; height: 6rem; background-color: #bce4fa;border-bottom: 0.25rem solid #00497b}',
    '.bar img{margin: 1rem}',
  ],
  template: `
    <div class="bar">
      <img src="../../assets/img/ceska-sporitelna-logo.svg" />
    </div>
  `,
})
export class AppBarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Departments } from 'src/shared/enums/departments';

@Component({
  selector: 'app-dep-filter',
  templateUrl: './dep-filter.component.html',
  styleUrls: ['./dep-filter.component.scss'],
})
export class DepFilterComponent implements OnInit {
  depTypes = Departments;
  @Output() filterKey = new EventEmitter<Departments>();
  constructor() {}

  ngOnInit(): void {}

  filter(key: Departments): void {
    const elem = document.getElementById(key);
    const selected = Array.from(document.getElementsByClassName('selected'));

    if (selected.length > 0) {
      selected.forEach((dom) => dom.classList.remove('selected'));
    }
    elem.classList.add('selected');
    this.filterKey.emit(Departments[key]);
  }
}

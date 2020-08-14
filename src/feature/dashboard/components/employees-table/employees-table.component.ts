import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Employee } from 'src/shared/models/employee-model';
import { PagerService } from 'src/shared/services/pager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.scss'],
})
export class EmployeesTableComponent {
  @Input() set empl(employees: Employee[]) {
    if (employees?.length) {
      this.pageSize = 5;
      this.allEmpls = [...employees];
      this.setPage(1, this.pageSize);
      this.pagerPages = [...this.preparePages()];
      this.pageSizeOptions = [...this.preparePagerOptions()];
    } else {
      this.employees = [];
    }
  }
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();

  employees: Employee[];
  allEmpls: Employee[];
  pager: any = {};
  pagedItems: Employee[];
  pagerPages = new Array<number>();
  pageSizeOptions = [];
  pageSize = 5;
  readonly headers = ['ID', 'First Name', 'Last Name', 'Department', 'Email', 'Actions'];
  constructor(private pagerService: PagerService, private router: Router) {}

  remove(id: number) {
    this.delete.emit(id);
  }

  setPage(page: number, pageSize: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.allEmpls.length, page, pageSize);

    if (this.pager.currentPage > this.pager.totalPages) {
      this.pager.currentPage = 1;
      this.pagedItems = [...this.allEmpls];
    } else {
      // get current page of items
      this.pagedItems = this.allEmpls.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

    // pass data into table
    this.employees = [...this.pagedItems];
  }

  // change data for table when page size is changed
  changePageSize(pageSize: number) {
    this.pageSize = Number(pageSize);
    this.setPage(this.pager.currentPage, Number(pageSize));
    this.pagerPages = [...this.preparePages()];
  }

  navigate(id: number, view: boolean): void {
    view
      ? this.router.navigate(['/employee', id, 'view'])
      : this.router.navigate(['/employee', id]);
  }

  // generate data for pager
  private preparePages(): number[] {
    const res = [];
    for (let i = 1; i <= this.pager.totalPages; i++) {
      res.push(i);
    }
    return res;
  }

  // generate data for page size selecotr
  private preparePagerOptions(): number[] {
    const maxItem = this.pager.totalPages * this.pageSize;
    const res = [];
    for (let i = this.pageSize; i <= maxItem; i += this.pageSize) {
      res.push(i);
    }
    return res;
  }
}

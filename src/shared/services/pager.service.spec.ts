import { TestBed } from '@angular/core/testing';

import { PagerService } from './pager.service';

describe('PagerService', () => {
  let service: PagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagerService);
  });

  test('should create pager service', () => {
    expect(service).toBeTruthy();
  });

  test('total pages should be 2', () => {
    const obj = service.getPager(2, 1, 1);
    expect(obj.totalPages).toBe(2);
  });
});

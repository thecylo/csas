import { TestBed } from '@angular/core/testing';

import { RequestHandlingInterceptor } from './request-handling.interceptor';
import { HttpInterceptor } from '@angular/common/http';

describe('HttpInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [RequestHandlingInterceptor],
    })
  );

  it('should create http interceptor', () => {
    const interceptor: HttpInterceptor = TestBed.inject(RequestHandlingInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

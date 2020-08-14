import { TestBed } from '@angular/core/testing';

import { BusyIndicatorService } from './busy-indicator.service';

describe('BusyIndicatorService', () => {
  let service: BusyIndicatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusyIndicatorService);
  });

  test('should create busy indicator service', () => {
    expect(service).toBeTruthy();
  });

  test('should return true value for show', () => {
    spyOn(service, 'show');
    service.show();
    service.subscribeToState().subscribe((show) => expect(show).toBeTruthy());
  });

  test('should return false value for show', () => {
    service.hide();
    service.subscribeToState().subscribe((show) => {
      expect(show).toBeFalsy();
    });
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepFilterComponent } from './dep-filter.component';
import { By } from '@angular/platform-browser';

describe('DepFilterComponent', () => {
  let component: DepFilterComponent;
  let fixture: ComponentFixture<DepFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DepFilterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create filters', () => {
    expect(component).toBeTruthy();
  });

  test('should have 6 spans with department', () => {
    const spans = fixture.debugElement.queryAll(By.css('.badge'));
    expect(spans.length).toBe(6);
  });
});

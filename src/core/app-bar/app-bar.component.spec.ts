import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppBarComponent } from './app-bar.component';
import { By } from '@angular/platform-browser';

describe('AppBarComponent', () => {
  let component: AppBarComponent;
  let fixture: ComponentFixture<AppBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppBarComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create app bar', () => {
    expect(component).toBeTruthy();
  });
  test('should have logo of ceska sporitelna', () => {
    const bar = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(bar.getAttribute('src')).toEqual('../../assets/img/ceska-sporitelna-logo.svg');
  });
  test('should have bar class', () => {
    const divClass = fixture.debugElement.query(By.css('div')).nativeElement.getAttribute('class');
    expect(divClass).toEqual('bar');
  });
});

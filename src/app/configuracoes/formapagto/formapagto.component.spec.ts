import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormapagtoComponent } from './formapagto.component';

describe('FormapagtoComponent', () => {
  let component: FormapagtoComponent;
  let fixture: ComponentFixture<FormapagtoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormapagtoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormapagtoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

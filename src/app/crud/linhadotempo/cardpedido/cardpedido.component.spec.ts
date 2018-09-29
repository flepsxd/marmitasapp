import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardpedidoComponent } from './cardpedido.component';

describe('CardpedidoComponent', () => {
  let component: CardpedidoComponent;
  let fixture: ComponentFixture<CardpedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardpedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardpedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoItensComponent } from './pedido-itens.component';

describe('PedidoItensComponent', () => {
  let component: PedidoItensComponent;
  let fixture: ComponentFixture<PedidoItensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoItensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoItensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

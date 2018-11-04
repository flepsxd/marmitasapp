import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendamentoItensComponent } from './agendamento-itens.component';

describe('AgendamentoItensComponent', () => {
  let component: AgendamentoItensComponent;
  let fixture: ComponentFixture<AgendamentoItensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendamentoItensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendamentoItensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

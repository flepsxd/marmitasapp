import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioTreeComponent } from './relatorio-tree.component';

describe('RelatorioTreeComponent', () => {
  let component: RelatorioTreeComponent;
  let fixture: ComponentFixture<RelatorioTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

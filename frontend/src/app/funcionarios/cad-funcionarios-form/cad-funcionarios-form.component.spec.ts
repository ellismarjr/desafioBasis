import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadFuncionariosFormComponent } from './cad-funcionarios-form.component';

describe('CadFuncionariosFormComponent', () => {
  let component: CadFuncionariosFormComponent;
  let fixture: ComponentFixture<CadFuncionariosFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadFuncionariosFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadFuncionariosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

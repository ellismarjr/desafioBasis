import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadEmpresasComponent } from './cad-empresas.component';

describe('CadEmpresasComponent', () => {
  let component: CadEmpresasComponent;
  let fixture: ComponentFixture<CadEmpresasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadEmpresasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

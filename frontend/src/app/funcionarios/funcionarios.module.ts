import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuncionariosRoutingModule } from './funcionarios-routing.module';
import { CadFuncionariosFormComponent } from './cad-funcionarios-form/cad-funcionarios-form.component';
import { FuncionariosComponent } from './funcionarios.component';


@NgModule({
  declarations: [CadFuncionariosFormComponent, FuncionariosComponent],
  imports: [
    CommonModule,
    FuncionariosRoutingModule
  ],
  exports: [
    CadFuncionariosFormComponent
  ]
})
export class FuncionariosModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadFuncionariosFormComponent } from './cad-funcionarios-form/cad-funcionarios-form.component';


const routes: Routes = [
  {
    path: "cad-func", component: CadFuncionariosFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuncionariosRoutingModule { }

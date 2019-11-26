import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FuncionariosComponent } from './funcionarios/funcionarios.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { CadFuncionariosFormComponent } from './funcionarios/cad-funcionarios-form/cad-funcionarios-form.component';
import { CadEmpresasComponent } from './empresas/cad-empresas/cad-empresas.component';


const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: DashboardComponent,
  },
  {
    path: 'funcionarios',
    component: FuncionariosComponent,
  },
  {
    path: 'funcionarios/add',
    component: CadFuncionariosFormComponent,
  },
  {
    path: 'empresas',
    component: EmpresasComponent
  },
  {
    path: 'empresas/add',
    component: CadEmpresasComponent,
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

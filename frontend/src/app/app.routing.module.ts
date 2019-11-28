import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { EmpresasComponent } from "./empresas/empresas.component";
import { CadEmpresasComponent } from "./empresas/cad-empresas/cad-empresas.component";
import { EmpresaResolverGuard } from "./empresas/guards/empresa-resolver.guard";
import { FuncionariosComponent } from "./funcionarios/funcionarios.component";
import { CadFuncionariosFormComponent } from "./funcionarios/cad-funcionarios-form/cad-funcionarios-form.component";
import { funcionarioResolverGuard } from "./funcionarios/guards/funcionarios-resolver.guard";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: DashboardComponent
  },

  {
    path: "empresas",
    component: EmpresasComponent
  },
  {
    path: "empresas/add",
    component: CadEmpresasComponent,
    resolve: {
      empresa: EmpresaResolverGuard
    }
  },
  {
    path: "empresas/edit/:id",
    component: CadEmpresasComponent,
    resolve: {
      empresa: EmpresaResolverGuard
    }
  },
  {
    path: "funcionarios",
    component: FuncionariosComponent
  },
  {
    path: "funcionarios/add",
    component: CadFuncionariosFormComponent,
    resolve: {
      funcionario: funcionarioResolverGuard
    }
  },
  {
    path: "funcionarios/edit/:id",
    component: CadFuncionariosFormComponent,
    resolve: {
      funcionario: funcionarioResolverGuard
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

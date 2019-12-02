import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { EmpresasComponent } from "./empresas/empresas.component";
import { EmpresaDetalheComponent } from "./empresas/empresa-detalhe/empresa-detalhe.component";
import { EmpresaResolverGuard } from "./empresas/guards/empresa-resolver.guard";
import { FuncionariosComponent } from "./funcionarios/funcionarios.component";
import { CadFuncionariosFormComponent } from "./funcionarios/cad-funcionarios-form/cad-funcionarios-form.component";
import { funcionarioResolverGuard } from "./funcionarios/guards/funcionarios-resolver.guard";
import { CadEmpresasComponent } from "./empresas/cad-empresas/cad-empresas.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: DashboardComponent
  },

  {
    path: "empresas",
    component: EmpresasComponent,
    resolve: {
      empresa: EmpresaResolverGuard
    }
  },
  {
    path: "empresas/detalhes/:id",
    component: EmpresaDetalheComponent,
    resolve: {
      empresa: EmpresaResolverGuard
    }
  },
  {
    path: "funcionarios",
    component: FuncionariosComponent,
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

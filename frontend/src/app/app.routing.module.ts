import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { EmpresasComponent } from "./empresas/empresas.component";
import { EmpresaDetalheComponent } from "./empresas/empresa-detalhe/empresa-detalhe.component";
import { EmpresaResolverGuard } from "./empresas/guards/empresa-resolver.guard";
import { FuncionariosComponent } from "./funcionarios/funcionarios.component";
import { FuncionarioDetalheComponent } from "./funcionarios/funcionario-detalhe/funcionario-detalhe.component";
import { funcionarioResolverGuard } from "./funcionarios/guards/funcionarios-resolver.guard";

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
  },
  {
    path: "funcionarios/detalhes/:id",
    component: FuncionarioDetalheComponent,
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

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { EmpresasComponent } from "./empresas/empresas.component";
import { CadEmpresasComponent } from "./empresas/cad-empresas/cad-empresas.component";
import { EmpresaResolverGuard } from "./empresas/guards/empresa-resolver.guard";

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

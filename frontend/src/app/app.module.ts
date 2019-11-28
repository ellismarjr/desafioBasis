import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";

import { AppRoutingModule } from "./app.routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";

import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { ModalModule } from "ngx-bootstrap/modal";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { EmpresasComponent } from "./empresas/empresas.component";
import { CadEmpresasComponent } from "./empresas/cad-empresas/cad-empresas.component";
import { FuncionariosComponent } from "./funcionarios/funcionarios.component";
import { CadFuncionariosFormComponent } from "./funcionarios/cad-funcionarios-form/cad-funcionarios-form.component";

import { EmpresasService } from "./empresas/empresas.service";
import { FuncionariosService } from "./funcionarios/funcionarios.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    EmpresasComponent,
    CadEmpresasComponent,
    FuncionariosComponent,
    CadFuncionariosFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [EmpresasService, FuncionariosService],
  bootstrap: [AppComponent]
})
export class AppModule {}

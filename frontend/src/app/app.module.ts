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
import { NgxMaskModule, IConfig } from "ngx-mask";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { EmpresasComponent } from "./empresas/empresas.component";
import { EmpresaDetalheComponent } from "./empresas/empresa-detalhe/empresa-detalhe.component";
import { FuncionariosComponent } from "./funcionarios/funcionarios.component";
import { FuncionarioDetalheComponent } from "./funcionarios/funcionario-detalhe/funcionario-detalhe.component";

import { EmpresasService } from "./empresas/empresas.service";
import { FuncionariosService } from "./funcionarios/funcionarios.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    EmpresasComponent,
    EmpresaDetalheComponent,
    FuncionariosComponent,
    FuncionarioDetalheComponent
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
    ModalModule.forRoot(),
    NgxMaskModule.forRoot()
  ],
  providers: [EmpresasService, FuncionariosService],
  bootstrap: [AppComponent]
})
export class AppModule {}

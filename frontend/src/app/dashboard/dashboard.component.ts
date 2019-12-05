import { Component, OnInit } from "@angular/core";
import { Empresa } from "../empresas/empresa";
import { EmpresasService } from "../empresas/empresas.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  empresas: Empresa[];

  constructor(
    private empresaService: EmpresasService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadEmpresas();
  }

  loadEmpresas() {
    this.empresaService.findAll().subscribe(
      res => {
        this.empresas = res;
      },
      error =>
        this.toastr.error(
          "Erro ao carregar lista de empresas. Tente novamente mais tarde!"
        )
    );
  }
}

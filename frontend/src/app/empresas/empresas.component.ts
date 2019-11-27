import { Component, OnInit } from "@angular/core";
import { EmpresasService } from "./empresas.service";
import { Empresa } from "./empresa";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-empresas",
  templateUrl: "./empresas.component.html",
  styleUrls: ["./empresas.component.css"]
})
export class EmpresasComponent implements OnInit {
  empresas: Empresa[];


  constructor(
    private empresasService: EmpresasService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.find();
  }

  find() {
    this.empresasService
      .find()
      .subscribe(res => (this.empresas = res["content"]));
  }

  onUpdate(id) {
    this.router.navigate(["edit", id], { relativeTo: this.route });
  }
}

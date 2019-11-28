import { Component, OnInit, ViewChild } from "@angular/core";
import { FuncionariosService } from "./funcionarios.service";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { Observable, Subject } from "rxjs";
import { Funcionario } from "./funcionarios";

@Component({
  selector: "app-funcionarios",
  templateUrl: "./funcionarios.component.html",
  styleUrls: ["./funcionarios.component.css"]
})
export class FuncionariosComponent implements OnInit {
  funcionario: Funcionario[];
  error$ = new Subject<boolean>();
  isEmpty = false;

  deleteModalRef: BsModalRef;
  @ViewChild("deleteModal", { static: false }) deleteModal;

  funcionarioSelecionado: Funcionario;

  constructor(
    private funcionarioService: FuncionariosService,
    private router: Router,
    private route: ActivatedRoute,
    private bsModalService: BsModalService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.find();
  }

  find() {
    this.funcionarioService.find().subscribe(
      res => {
        this.funcionario = res["content"];
        if (res["content"][0]["rel"] === null) {
          this.isEmpty = true;
        } else {
          this.isEmpty = false;
        }
      },
      error =>
        this.toastr.error(
          "Erro ao carregar lista de funcionários. Tente novamente mais tarde!"
        )
    );
  }

  onUpdate(id) {
    this.router.navigate(["edit", id], { relativeTo: this.route });
  }

  onDelete(empresa) {
    this.funcionarioSelecionado = empresa;
    this.deleteModalRef = this.bsModalService.show(this.deleteModal, {
      class: "modal-sm"
    });
  }

  onConfirmDelete() {
    this.funcionarioService.delete(this.funcionarioSelecionado.id).subscribe(
      success => {
        this.toastr.success("Funcionário excluído com sucesso!");
        // this.router.navigate(["/empresas"]);
        window.location.reload();
        this.deleteModalRef.hide();
      },
      error => {
        this.toastr.error(
          "Erro ao tentar excluir funcionário. Tente novamente mais tarde!"
        );
      }
    );
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  }

  handleError() {
    this.toastr.error(
      "Erro ao carregar funcionários. Tente novamente mais tarde!"
    );
  }
}

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
  funcionarios: Funcionario[];
  error$ = new Subject<boolean>();
  isEmpty = true;

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
        this.funcionarios = res;
        console.log(this.funcionarios);
        if (res.length === 0) {
          this.isEmpty = true;
        } else {
          this.isEmpty = false;
        }

        // console.log(this.funcionario[0]);
        // if (res["content"][0]["rel"] === null) {
        //   // this.isEmpty = true;
        //   // console.log(res["content"]);
        //   // console.log(this.isEmpty);
        // } else {
        //   // this.isEmpty = false;
        // }
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

  onDelete(funcionario) {
    this.funcionarioSelecionado = funcionario;
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

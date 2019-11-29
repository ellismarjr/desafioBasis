import { Component, OnInit, ViewChild } from "@angular/core";
import { EmpresasService } from "./empresas.service";
import { Empresa } from "./empresa";
import { Router, ActivatedRoute } from "@angular/router";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import { catchError } from "rxjs/operators";
import { empty, Observable, Subject } from "rxjs";

@Component({
  selector: "app-empresas",
  templateUrl: "./empresas.component.html",
  styleUrls: ["./empresas.component.css"]
})
export class EmpresasComponent implements OnInit {
  empresas: Empresa[];
  empresasOb$: Observable<Empresa[]>;
  error$ = new Subject<boolean>();
  isEmpty = false;

  deleteModalRef: BsModalRef;
  @ViewChild("deleteModal", { static: false }) deleteModal;

  empresaSelecionada: Empresa;

  constructor(
    private empresasService: EmpresasService,
    private router: Router,
    private route: ActivatedRoute,
    private bsModalService: BsModalService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.find();
    // this.onRefresh();
  }

  // onRefresh() {
  //   this.empresasOb$ = this.empresasService.find().pipe(
  //     catchError(error => {
  //       console.log(error);
  //       this.handleError();
  //       return empty();
  //     })
  //   );
  // }

  find() {
    this.empresasService.find().subscribe(
      res => {
        this.empresas = res;
        // Check if response is empty
        if (res.length === 0) {
          this.isEmpty = true;
        } else {
          this.isEmpty = false;
        }
      },
      error =>
        this.toastr.error(
          "Erro ao carregar lista de empresas. Tente novamente mais tarde!"
        )
    );
  }

  onUpdate(id) {
    this.router.navigate(["edit", id], { relativeTo: this.route });
  }

  onDelete(empresa) {
    this.empresaSelecionada = empresa;
    this.deleteModalRef = this.bsModalService.show(this.deleteModal, {
      class: "modal-sm"
    });
  }

  onConfirmDelete() {
    this.empresasService.delete(this.empresaSelecionada.id).subscribe(
      success => {
        this.toastr.success("Empresa excluída com sucesso!");
        // this.router.navigate(["/empresas"]);
        window.location.reload();
        this.deleteModalRef.hide();
      },
      error => {
        this.toastr.error(
          "Erro ao tentar excluir empresa. Tente novamente mais tarde!"
        );
      }
    );
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  }

  handleError() {
    this.toastr.error("Erro ao carregar empresas. Tente novamente mais tarde!");
  }
}

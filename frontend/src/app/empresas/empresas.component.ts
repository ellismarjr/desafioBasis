import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { EmpresasService } from "./empresas.service";
import { Empresa } from "./empresa";
import { Router, ActivatedRoute } from "@angular/router";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import { empty, Observable, Subject } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-empresas",
  templateUrl: "./empresas.component.html",
  styleUrls: ["./empresas.component.css"]
})
export class EmpresasComponent implements OnInit {
  empresas: Empresa[];
  error$ = new Subject<boolean>();
  isEmpty = false;
  form: FormGroup;
  submitted = false;
  deleteModalRef: BsModalRef;
  cadModalRef: BsModalRef;
  editarModalRef: BsModalRef;
  @ViewChild("deleteModal", { static: false }) deleteModal;

  empresaSelecionada: Empresa;

  constructor(
    private empresaService: EmpresasService,
    private router: Router,
    private route: ActivatedRoute,
    private bsModalService: BsModalService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.find();

    const empresa = this.route.snapshot.data["empresa"];

    this.form = this.fb.group({
      id: [empresa.id],
      nome: [empresa.nome, [Validators.required, Validators.maxLength(500)]],
      endereco: [
        empresa.endereco,
        [Validators.required, Validators.maxLength(250)]
      ],
      cnpj: [empresa.cnpj, [Validators.required, Validators.maxLength(14)]]
    });
  }

  find() {
    this.empresaService.find().subscribe(
      res => {
        this.empresas = res;
        // Check if response is empty
        if (!res.length) {
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

  onSubmit() {
    this.submitted = true;

    if (this.form.valid) {
      let msgSuccess = "Empresa cadastrada com sucesso!";
      let msgError = "Erro ao cadastrar empresa. Verifique seus dados!";

      if (this.form.value.id) {
        msgSuccess = "Empresa atualizada com sucesso!";
        msgError = "Erro ao atualizar empresa. Verifique seus dados!";
      }

      this.empresaService.save(this.form.value).subscribe(
        empresa => {
          this.toastr.success(msgSuccess);
          this.empresas.push(empresa);
          this.cadModalRef.hide();
        },
        error => {
          this.toastr.error(msgError);
          this.cadModalRef.hide();
        }
      );
    }
  }

  onUpdate(id) {
    this.router.navigate(["detalhes", id], { relativeTo: this.route });
  }

  onDelete(empresa) {
    this.empresaSelecionada = empresa;
    this.deleteModalRef = this.bsModalService.show(this.deleteModal, {
      class: "modal-sm"
    });
  }

  onConfirmDelete() {
    this.empresaService.delete(this.empresaSelecionada.id).subscribe(
      success => {
        window.location.reload();
        this.deleteModalRef.hide();
        this.toastr.success("Empresa excluída com sucesso!");
        this.form.reset();
      },
      error => {
        this.toastr.error(
          "Erro ao tentar excluir empresa. Tente novamente mais tarde!"
        );
        this.deleteModalRef.hide();
      }
    );
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  }

  handleError() {
    this.toastr.error("Erro ao carregar empresas. Tente novamente mais tarde!");
  }

  openModal(template: TemplateRef<any>) {
    this.cadModalRef = this.bsModalService.show(template);
  }

  openModalEditar(template: TemplateRef<any>) {
    this.editarModalRef = this.bsModalService.show(template);
  }

  hasError(field: string) {
    return this.form.get(field).errors;
  }
}

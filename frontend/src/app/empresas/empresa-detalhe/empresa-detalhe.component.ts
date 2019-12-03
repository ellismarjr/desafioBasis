import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { EmpresasService } from "../empresas.service";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Empresa } from "../empresa";

@Component({
  selector: "app-empresa-detalhe",
  templateUrl: "./empresa-detalhe.component.html",
  styleUrls: ["./empresa-detalhe.component.css"]
})
export class EmpresaDetalheComponent implements OnInit {
  form: FormGroup;
  empresas: Empresa[];
  submitted = false;
  excluirModalRef: BsModalRef;
  editarModalRef: BsModalRef;
  @ViewChild("excluirModal", { static: false }) excluirModal;

  empresaSelecionada: Empresa = new Empresa();

  constructor(
    private fb: FormBuilder,
    private empresaService: EmpresasService,
    private toastr: ToastrService,
    private bsModalService: BsModalService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    const empresa = this.route.snapshot.data["empresa"];

    this.form = this.fb.group({
      id: [empresa.id],
      nome: [empresa.nome, [Validators.required, Validators.maxLength(250)]],
      endereco: [
        empresa.endereco,
        [Validators.required, Validators.maxLength(250)]
      ],
      cnpj: [empresa.cnpj, [Validators.required, Validators.maxLength(14)]]
    });

    this.getEmpresa(empresa.id);
  }

  hasError(field: string) {
    return this.form.get(field).errors;
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
          this.editarModalRef.hide();
          this.empresaSelecionada = empresa;
          this.toastr.success(msgSuccess);
        },
        error => {
          this.onCancel();
          this.toastr.error(msgError);
        }
      );
    }
  }

  onConfirmDelete() {
    this.empresaService.delete(this.empresaSelecionada.id).subscribe(
      success => {
        this.toastr.success("Empresa excluída com sucesso!");
        this.excluirModalRef.hide();
        this.location.back();
      },
      error => {
        this.toastr.error(
          "Erro ao tentar excluir empresa. Tente novamente mais tarde!"
        );
        this.excluirModalRef.hide();
      }
    );
  }

  getEmpresa(id) {
    this.empresaService.findById(id).subscribe(empresa => {
      this.empresaSelecionada = empresa;
    });
  }

  onUpdate(id) {
    this.router.navigate(["detalhes", id], { relativeTo: this.route });
  }

  onDelete(empresa) {
    this.empresaSelecionada = empresa;
    this.excluirModalRef = this.bsModalService.show(this.excluirModal);
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
    this.router.navigate(["empresas"]);
  }

  openModal(template: TemplateRef<any>) {
    this.editarModalRef = this.bsModalService.show(template);
  }

  openModalExcluir(template: TemplateRef<any>) {
    this.excluirModalRef = this.bsModalService.show(template);
  }

  back() {
    this.location.back();
  }
  // onDeclineDelete() {
  //   this.deleteModalRef.hide();
  // }
}

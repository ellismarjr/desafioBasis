import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Empresa } from "src/app/empresas/empresa";
import { Funcionario } from "../funcionarios";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { FuncionariosService } from "../funcionarios.service";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { EmpresasService } from "src/app/empresas/empresas.service";
import { myValidators } from "../validators";

@Component({
  selector: "app-funcionario-detalhe",
  templateUrl: "./funcionario-detalhe.component.html",
  styleUrls: ["./funcionario-detalhe.component.css"]
})
export class FuncionarioDetalheComponent implements OnInit {
  public mask = [
    /[1-9]/,
    /\d/,
    /\d/,
    ".",
    /\d/,
    /\d/,
    /\d/,
    ".",
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/
  ];

  validators: myValidators = new myValidators(this.toastr);

  form: FormGroup;
  empresas: Empresa[];
  submitted = false;
  excluirModalRef: BsModalRef;
  editarModalRef: BsModalRef;
  @ViewChild("excluirModal", { static: false }) excluirModal;

  funcionarioSelecionado: Funcionario = new Funcionario();
  empresaSelecionada: Empresa = new Empresa();

  constructor(
    private fb: FormBuilder,
    private funcionarioService: FuncionariosService,
    private empresaService: EmpresasService,
    private toastr: ToastrService,
    private bsModalService: BsModalService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    const funcionario = this.route.snapshot.data["funcionario"];

    this.form = this.fb.group({
      id: [funcionario.id],
      nome: [
        funcionario.nome,
        [Validators.required, Validators.maxLength(250)]
      ],
      dataNascimento: [
        funcionario.dataNascimento,
        [Validators.required, Validators.maxLength(250)]
      ],
      cpf: [funcionario.cpf, [Validators.required, Validators.maxLength(14)]],
      empresaId: [funcionario.empresaId]
    });

    this.getFuncionario(funcionario.id);
    this.getEmpresaId(funcionario.empresaId);
  }

  hasError(field: string) {
    return this.form.get(field).errors;
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.valid) {
      this.validators.validNome(this.form.value.nome);
      this.validators.validDataNascimento(this.form.value.dataNascimento);
      this.validators.validCpf(this.form.value.cpf);
      this.validators.validEmpresa(this.form.value.empresaId);
      let msgSuccess = "Funcionário cadastrado com sucesso!";
      let msgError = "Erro ao cadastrar empresa. Verifique seus dados!";

      if (this.form.value.id) {
        msgSuccess = "Funcionário atualizado com sucesso!";
        msgError = "Erro ao atualizar empresa. Verifique seus dados!";
      }

      if (this.validators.validations) {
        this.funcionarioService.save(this.form.value).subscribe(
          funcionario => {
            this.editarModalRef.hide();
            this.funcionarioSelecionado = funcionario;
            this.toastr.success(msgSuccess);
          },
          error => {
            this.onCancel();
            this.toastr.error(msgError);
          }
        );
      }
    } else {
      this.validators.validNome(this.form.value.nome);
      this.validators.validDataNascimento(this.form.value.dataNascimento);
      this.validators.validCpf(this.form.value.cpf);
      this.validators.validEmpresa(this.form.value.empresaId);
    }

    this.getEmpresaId(this.form.value.empresaId);
  }

  onConfirmDelete() {
    this.funcionarioService.delete(this.funcionarioSelecionado.id).subscribe(
      success => {
        this.toastr.success("Funcionário excluída com sucesso!");
        this.excluirModalRef.hide();
        this.location.back();
      },
      error => {
        this.toastr.error(
          "Erro ao tentar excluir funcionário. Tente novamente mais tarde!"
        );
        this.excluirModalRef.hide();
      }
    );
  }

  getFuncionario(id) {
    this.funcionarioService.findById(id).subscribe(funcionario => {
      this.funcionarioSelecionado = funcionario;
    });
  }

  onUpdate(id) {
    this.router.navigate(["detalhes", id], { relativeTo: this.route });
  }

  onDelete(funcionario) {
    this.funcionarioSelecionado = funcionario;
    this.excluirModalRef = this.bsModalService.show(this.excluirModal);
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
    this.router.navigate(["empresas"]);
  }

  openModal(template: TemplateRef<any>) {
    this.getEmpresaId(this.funcionarioSelecionado.empresaId);
    this.getEmpresa();
    this.editarModalRef = this.bsModalService.show(template);
  }

  openModalExcluir(template: TemplateRef<any>) {
    this.excluirModalRef = this.bsModalService.show(template);
  }

  getEmpresa() {
    this.empresaService.find().subscribe(empresa => {
      this.empresas = empresa;
    });
  }

  getEmpresaId(id) {
    this.empresaService.findById(id).subscribe(empresa => {
      this.empresaSelecionada = empresa;
    });
  }

  loadEmpresaId(id) {
    this.empresaService
      .findById(this.funcionarioSelecionado.empresaId)
      .subscribe(empresa => {
        this.empresaSelecionada = empresa;
      });
  }

  back() {
    this.location.back();
  }
}

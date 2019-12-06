import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { EmpresasService } from "../empresas.service";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Empresa } from "../empresa";
import { Funcionario } from "src/app/funcionarios/funcionarios";
import { MyValidators } from "../validators";

@Component({
  selector: "app-empresa-detalhe",
  templateUrl: "./empresa-detalhe.component.html",
  styleUrls: ["./empresa-detalhe.component.css"]
})
export class EmpresaDetalheComponent implements OnInit {
  public mask = [
    /[1-9]/,
    /\d/,
    ".",
    /\d/,
    /\d/,
    /\d/,
    ".",
    /\d/,
    /\d/,
    /\d/,
    "/",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/
  ];

  // Classe para validação dos campos ao cadastrar ou editar uma empresa
  validators: MyValidators = new MyValidators(this.toastr);

  form: FormGroup;
  empresas: Empresa[];
  funcionarios: Funcionario[];
  submitted = false;
  excluirModalRef: BsModalRef;
  editarModalRef: BsModalRef;
  showFuncionario = false;
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
      nome: [empresa.nome, [Validators.required, Validators.maxLength(200)]],
      endereco: [
        empresa.endereco,
        [Validators.required, Validators.maxLength(200)]
      ],
      cnpj: [empresa.cnpj, [Validators.required, Validators.maxLength(18)]]
    });

    // Carrega os dados da empresa
    this.getEmpresa(empresa.id);
  }

  hasError(field: string) {
    return this.form.get(field).errors;
  }

  /**
   * Método para salvar em caso de criação ou editação de empresas
   */
  onSubmit() {
    this.submitted = true;

    if (this.form.valid) {
      /**
       * Validação dos campos na criação e/ou edição de empresas
       */
      this.validators.validNome(this.form.value.nome);
      this.validators.validEndereco(this.form.value.endereco);
      this.validators.validCnpj(this.form.value.cnpj);

      let msgSuccess = "Empresa cadastrada com sucesso!";
      let msgError = "Erro ao cadastrar empresa. Verifique seus dados!";

      /**
       * Checagem para verificar se existe o id,
       * se existe é porque é uma edição de uma empresa
       * senão é uma criação de uma empresa
       */
      if (this.form.value.id) {
        msgSuccess = "Empresa atualizada com sucesso!";
        msgError = "Erro ao atualizar empresa. Verifique seus dados!";
      }

      /**
       * Checagem se todas as métricas de validação foram atendidas
       * na classe MyValidators
       */
      if (this.validators.validations) {
        this.empresaService.save(this.form.value).subscribe(
          empresa => {
            this.editarModalRef.hide();
            this.empresaSelecionada = empresa; // Atualiza os dados da empresa selecionada no objeto
            this.toastr.success(msgSuccess); // Mostra uma mensagem de sucesso
          },
          error => {
            this.onCancel();
            this.toastr.error(msgError);
          }
        );
      }
    } else {
      this.validators.validNome(this.form.value.nome);
      this.validators.validEndereco(this.form.value.endereco);
      this.validators.validCnpj(this.form.value.cnpj);
    }
  }

  /**
   * Método para excluir a empresa
   */
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

  /**
   * Busca todos os dados da empresa
   */
  getEmpresa(id) {
    this.empresaService.findById(id).subscribe(empresa => {
      this.empresaSelecionada = empresa;
    });
  }

  /**
   * Mostra o modal para exclusão da empresa
   */
  onDelete(empresa) {
    this.empresaSelecionada = empresa;
    this.excluirModalRef = this.bsModalService.show(this.excluirModal);
  }

  /**
   * Método para resetar o form
   */
  onCancel() {
    this.submitted = false;
    this.form.reset();
  }

  /**
   * Mostra modal para edição da empresa
   */
  openModal(template: TemplateRef<any>) {
    this.editarModalRef = this.bsModalService.show(template);
  }

  /**
   *
   * Mostra o modal de exluir
   */
  openModalExcluir(template: TemplateRef<any>) {
    this.excluirModalRef = this.bsModalService.show(template);
  }

  back() {
    this.location.back();
  }

  /**
   * Método para mostrar os funcionários ao usuário clicar no botão de Funcionários
   */
  showFuncionarios() {
    this.funcionarios = this.empresaSelecionada["funcionarios"];

    if (!this.funcionarios.length) {
      this.toastr.info(
        "Não existem funcionários cadastrados para esta empresa!"
      );
    } else {
      this.showFuncionario = !this.showFuncionario;
    }
  }

  /**
   * Método para ir para o funcionário ao usuário clicar em cima do funcionário
   */
  goToFuncionario(id) {
    this.router.navigate(["funcionarios/detalhes", id]);
  }
}

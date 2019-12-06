import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { EmpresasService } from "./empresas.service";
import { Empresa } from "./empresa";
import { Router, ActivatedRoute } from "@angular/router";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import { empty, Observable, Subject } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MyValidators } from "./validators";

@Component({
  selector: "app-empresas",
  templateUrl: "./empresas.component.html",
  styleUrls: ["./empresas.component.css"]
})
export class EmpresasComponent implements OnInit {
  public myModel = "";
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

  empresas: Empresa[];
  error$ = new Subject<boolean>();
  isEmpty = false;
  form: FormGroup;
  submitted = false;
  deleteModalRef: BsModalRef;
  cadModalRef: BsModalRef;
  editarModalRef: BsModalRef;
  @ViewChild("deleteModal", { static: false }) deleteModal;

  empresaSelecionada: Empresa = new Empresa();

  constructor(
    private empresaService: EmpresasService,
    private router: Router,
    private route: ActivatedRoute,
    private bsModalService: BsModalService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    // Carrega as empresas ao iniciar a página, trazendo o id e o nome das empresas
    this.find();

    const empresa = this.route.snapshot.data["empresa"];

    this.form = this.fb.group({
      id: [empresa.id],
      nome: [
        empresa.nome,
        [Validators.required, Validators.maxLength(this.validators.nome)]
      ],
      endereco: [
        empresa.endereco,
        [Validators.required, Validators.maxLength(this.validators.endereco)]
      ],
      cnpj: [
        empresa.cnpj,
        [Validators.required, Validators.maxLength(this.validators.cnpj)]
      ]
    });
  }

  // Método para carregar as empresas
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
            this.toastr.success(msgSuccess); // Mostra uma mensagem de sucesso
            this.empresas.push(empresa); // Adiciona a empresa criada no array empresas[]
            this.cadModalRef.hide(); // Esconde o modal de criação de um empresa
          },
          error => {
            this.toastr.error(msgError); // Mostra uma mensagem de erro ao cadastrar uma empresa
            this.cadModalRef.hide(); // Esconde o modal de criação de uma empresa
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
   * Pega o id da empresa e leva o usuário para tela de detalhe
   * mostrando os restantes de informações da empresa
   */
  onUpdate(id) {
    this.router.navigate(["detalhes", id], { relativeTo: this.route });
  }

  // Abri o modal para cadastrar empresa
  openModal(template: TemplateRef<any>) {
    this.cadModalRef = this.bsModalService.show(template);
  }
}

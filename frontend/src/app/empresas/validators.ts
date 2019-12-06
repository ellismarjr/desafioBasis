import { ToastrService } from "ngx-toastr";

export class MyValidators {
  constructor(private toastr: ToastrService) {}

  nome = 200;
  endereco = 200;
  cnpj = 18;
  validations = true;

  validNome(nome) {
    if (nome) {
      if (nome.length > this.nome) {
        this.toastr.warning(
          `O campo nome não pode ultrapassar ${this.nome} caracteres!`
        );
        this.validations = false;
      }
    } else {
      this.toastr.warning(`O campo nome está vazio!`);
      this.validations = false;
    }
  }

  validEndereco(endereco) {
    if (endereco) {
      if (endereco.length > this.endereco) {
        this.toastr.warning(
          `O campo nome não pode ultrapassar ${this.endereco} caracteres!`
        );
        this.validations = false;
      }
    } else {
      this.toastr.warning(`O campo endereço está vazio!`);
      this.validations = false;
    }
  }

  validCnpj(cnpj) {
    if (cnpj) {
      if (cnpj.length > this.cnpj) {
        this.toastr.warning(
          `O campo CNPJ não pode ultrapassar ${this.cnpj} caracteres!`
        );
        this.validations = false;
      } else if (cnpj.length < this.cnpj) {
        this.toastr.warning(
          `O campo CNPJ não pode ter menos que ${this.cnpj} caracteres!`
        );
        this.validations = false;
      }
    } else {
      this.toastr.warning(`O campo CNPJ está vazio!`);
      this.validations = false;
    }
  }
}

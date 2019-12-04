import { ToastrService } from "ngx-toastr";

export class myValidators {
  constructor(private toastr: ToastrService) {}

  nome = 200;
  dataNascimento = 10;
  cpf = 14;
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

  validDataNascimento(dataNascimento) {
    if (dataNascimento) {
      if (dataNascimento.length > this.dataNascimento) {
        this.toastr.warning(
          `O campo data de nascimento não pode ultrapassar ${this.dataNascimento} caracteres!`
        );
        this.validations = false;
      }
    } else {
      this.toastr.warning(`O campo data de nascimento está vazio!`);
      this.validations = false;
    }
  }

  validCpf(cpf) {
    if (cpf) {
      if (cpf.length > this.cpf) {
        this.toastr.warning(
          `O campo de CPF não pode ultrapassar ${this.cpf} caracteres!`
        );
        this.validations = false;
      } else if (cpf.length < this.cpf) {
        this.toastr.warning(
          `O campo CPF não pode ter menos que ${this.cpf} caracteres!`
        );
        this.validations = false;
      }
    } else {
      this.toastr.warning(`O campo CPF está vazio!`);
      this.validations = false;
    }
  }

  validEmpresa(empresa) {
    if (!empresa) {
      this.toastr.warning(`Selecione uma empresa!`);
      this.validations = false;
    } else {
      this.validations = true;
    }
  }

  // validEndereco(endereco) {
  //   if (endereco) {
  //     if (endereco.length > this.endereco) {
  //       this.toastr.warning(
  //         `O campo nome não pode ultrapassar ${this.endereco} caracteres!`
  //       );
  //       this.validations = false;
  //     }
  //   } else {
  //     this.toastr.warning(`O campo endereço está vazio!`);
  //     this.validations = false;
  //   }
  // }

  // validCnpj(cnpj) {
  //   if (cnpj) {
  //     if (cnpj.length > this.cnpj) {
  //       this.toastr.warning(
  //         `O campo CNPJ não pode ultrapassar ${this.cnpj} caracteres!`
  //       );
  //       this.validations = false;
  //     } else if (cnpj.length < this.cnpj) {
  //       this.toastr.warning(
  //         `O campo CNPJ não pode ter menos que ${this.cnpj} caracteres!`
  //       );
  //       this.validations = false;
  //     }
  //   } else {
  //     this.toastr.warning(`O campo CNPJ está vazio!`);
  //     this.validations = false;
  //   }
  // }
}

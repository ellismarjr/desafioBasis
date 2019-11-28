import { Empresa } from "../empresas/empresa";

export interface Funcionario {
  id: number;
  nome: string;
  dataNascimento: string;
  cpf: string;
  empresa_id: number;
}

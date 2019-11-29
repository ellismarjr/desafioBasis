package com.desafiobasis.com.desafiobasis.Models.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class FuncionarioDTO implements Serializable {
    private static  final long serialVersionUID = 1L;

    private Long id;

    private String nome;
    private String dataNascimento;
    private String cpf;
    private Long empresaId;

    public FuncionarioDTO() {
    }
}

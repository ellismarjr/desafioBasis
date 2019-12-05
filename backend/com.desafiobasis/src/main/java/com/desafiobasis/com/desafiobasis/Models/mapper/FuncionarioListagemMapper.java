package com.desafiobasis.com.desafiobasis.Models.mapper;


import com.desafiobasis.com.desafiobasis.Models.Funcionario;
import com.desafiobasis.com.desafiobasis.Models.dto.FuncionarioListagemDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface FuncionarioListagemMapper extends EntityMapper<FuncionarioListagemDTO, Funcionario>{
}

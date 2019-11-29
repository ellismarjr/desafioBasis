package com.desafiobasis.com.desafiobasis.Models.mapper;

import com.desafiobasis.com.desafiobasis.Models.Funcionario;
import com.desafiobasis.com.desafiobasis.Models.dto.FuncionarioDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {})
public interface FuncionarioMapper {

    @Mapping(source = "empresaId", target = "empresa.id")
    Funcionario toEntity(FuncionarioDTO dto);

    @Mapping(source = "empresa.id", target = "empresaId")
    FuncionarioDTO toDto(Funcionario entity);
}

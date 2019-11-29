package com.desafiobasis.com.desafiobasis.Models.mapper;

import com.desafiobasis.com.desafiobasis.Models.Empresa;
import com.desafiobasis.com.desafiobasis.Models.dto.EmpresaDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {})
public interface EmpresaMapper {

    Empresa toEntity(EmpresaDTO dto);

    EmpresaDTO toDto(Empresa entity);
}

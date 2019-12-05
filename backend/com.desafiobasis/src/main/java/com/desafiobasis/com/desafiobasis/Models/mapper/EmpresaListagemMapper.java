package com.desafiobasis.com.desafiobasis.Models.mapper;

import com.desafiobasis.com.desafiobasis.Models.Empresa;
import com.desafiobasis.com.desafiobasis.Models.dto.EmpresaListagemDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface EmpresaListagemMapper extends EntityMapper<EmpresaListagemDTO, Empresa> {
}

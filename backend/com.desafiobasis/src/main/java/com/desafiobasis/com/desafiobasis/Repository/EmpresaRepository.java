package com.desafiobasis.com.desafiobasis.Repository;

import com.desafiobasis.com.desafiobasis.Models.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmpresaRepository extends JpaRepository<Empresa, Long> {

    Empresa findById(long Id);

    Empresa deleteById(long Id);



}
package com.desafiobasis.com.desafiobasis.Repository;

import com.desafiobasis.com.desafiobasis.Models.Funcionario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {
    Funcionario findById(long Id);
}

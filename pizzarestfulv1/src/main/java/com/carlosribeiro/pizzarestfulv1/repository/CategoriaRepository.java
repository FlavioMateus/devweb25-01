package com.carlosribeiro.pizzarestfulv1.repository;

import com.carlosribeiro.pizzarestfulv1.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

}

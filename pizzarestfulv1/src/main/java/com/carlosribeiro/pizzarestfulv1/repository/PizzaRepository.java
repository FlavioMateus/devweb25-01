package com.carlosribeiro.pizzarestfulv1.repository;

import com.carlosribeiro.pizzarestfulv1.model.Pizza;
import jakarta.persistence.LockModeType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PizzaRepository extends JpaRepository<Pizza, Long> {

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select p from Pizza p left outer join fetch p.categoria where p.id = :id")
    Optional<Pizza> recuperarPizzaPorIdComLock(@Param("id") Long id);

    @Query("select p from Pizza p left outer join fetch p.categoria order by p.id")
    List<Pizza> recuperarPizzasComCategoria();

    @Query("select p from Pizza p left outer join fetch p.categoria where p.id = :id")
    Optional<Pizza> recuperarPizzaPorId(@Param("id") Long id);

    @Query(
            value = "select p " +
                    "from Pizza p " +
                    "left outer join fetch p.categoria " +
                    "where p.nome like :nome " +
                    "order by p.id",
            countQuery = "select count(p) from Pizza p where p.nome like :nome"
    )
    Page<Pizza> recuperarPizzasComPaginacao(Pageable pageable, @Param("nome") String nome);

    @Query("select p from Pizza p " +
            "left outer join fetch p.categoria c " +
            "where c.slug = :slugCategoria " +
            "order by p.id")
    List<Pizza> recuperarPizzasPorSlugCategoria(@Param("slugCategoria") String slugCategoria);

    @Query(
            value = "select p from Pizza p " +
                    "left outer join fetch p.categoria c " +
                    "where c.slug = :slug " +
                    "order by p.id",
            countQuery = "select count(p) " +
                    "from Pizza p " +
                    "left outer join p.categoria c " +
                    "where c.slug = :slug "
    )
    Page<Pizza> recuperarPizzasPaginadosPorSlugDaCategoria(@Param("slug") String slug, Pageable pageable);

    @Query(
            value = "select p from Pizza p " +
                    "left outer join fetch p.categoria c " +
                    "order by p.id",
            countQuery = "select count(p) from Pizza p "
    )
    Page<Pizza> recuperarPizzasPaginados(Pageable pageable);
}

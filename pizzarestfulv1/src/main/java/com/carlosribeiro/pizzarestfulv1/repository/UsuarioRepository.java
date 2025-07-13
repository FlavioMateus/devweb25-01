package com.carlosribeiro.pizzarestfulv1.repository;

import com.carlosribeiro.pizzarestfulv1.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Usuario findByContaAndSenha(String conta, String senha);
    Usuario findByConta(String conta);
    @Modifying
    @Query(value = "DELETE FROM usuario_favoritos WHERE favoritos_id = :pizzaId", nativeQuery = true)
    void removerPizzaDosFavoritos(@Param("pizzaId") Long pizzaId);

}

package com.carlosribeiro.pizzarestfulv1;

import com.carlosribeiro.pizzarestfulv1.model.Categoria;
import com.carlosribeiro.pizzarestfulv1.model.Pizza;
import com.carlosribeiro.pizzarestfulv1.model.Usuario;
import com.carlosribeiro.pizzarestfulv1.repository.CategoriaRepository;
import com.carlosribeiro.pizzarestfulv1.repository.PizzaRepository;
import com.carlosribeiro.pizzarestfulv1.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.math.BigDecimal;
import java.time.LocalDate;

@SpringBootApplication
public class Pizzarestfulv1Application implements CommandLineRunner {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PizzaRepository pizzaRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    public static void main(String[] args) {
        SpringApplication.run(Pizzarestfulv1Application.class, args);
    }

    @Override
    public void run(String... args) {

        // Cria usuário admin
        //Usuario usuario = new Usuario("admin", "desweb");
        //usuarioRepository.save(usuario);
/* 
        // Cria categorias
        Categoria tradicional = new Categoria("Tradicional", "tradicional");
        Categoria especiais = new Categoria("Especiais", "especiais");
        Categoria doces = new Categoria("Doces", "doces");
        Categoria vegetarianas = new Categoria("Vegetarianas", "vegetarianas");
        Categoria premium = new Categoria("Premium", "premium");

        categoriaRepository.save(tradicional);
        categoriaRepository.save(especiais);
        categoriaRepository.save(doces);
        categoriaRepository.save(vegetarianas);
        categoriaRepository.save(premium);

        // Cria pizzas
        pizzaRepository.save(new Pizza(
                "calabresa.jpg",
                "Calabresa",
                "calabresa",
                "Calabresa fatiada, cebola e mussarela. 750g",
                true,
                new BigDecimal("39.90"),
                LocalDate.now(),
                tradicional
        ));

        pizzaRepository.save(new Pizza(
                "mussarela.jpg",
                "Mussarela",
                "mussarela",
                "Queijo mussarela, orégano e molho especial.",
                true,
                new BigDecimal("37.00"),
                LocalDate.now(),
                tradicional
        ));

        pizzaRepository.save(new Pizza(
                "4queijos.jpg",
                "Quatro Queijos",
                "quatro-queijos",
                "Mussarela, parmesão, provolone e gorgonzola.",
                true,
                new BigDecimal("45.00"),
                LocalDate.now(),
                especiais
        ));

        pizzaRepository.save(new Pizza(
                "chocolate.jpg",
                "Chocolate",
                "chocolate",
                "Pizza doce com cobertura de chocolate ao leite.",
                true,
                new BigDecimal("42.00"),
                LocalDate.now(),
                doces
        ));

        pizzaRepository.save(new Pizza(
                "banana.jpg",
                "Banana com Canela",
                "banana-com-canela",
                "Banana, açúcar e canela com leite condensado.",
                true,
                new BigDecimal("40.00"),
                LocalDate.now(),
                doces
        ));

        pizzaRepository.save(new Pizza(
                "brocolis.jpg",
                "Brócolis com Alho",
                "brocolis-com-alho",
                "Brócolis refogado com alho e mussarela.",
                true,
                new BigDecimal("43.00"),
                LocalDate.now(),
                vegetarianas
        ));

        pizzaRepository.save(new Pizza(
                "parma.jpg",
                "Parma com Rúcula",
                "parma-com-rucula",
                "Presunto de Parma, rúcula e lascas de parmesão.",
                true,
                new BigDecimal("59.90"),
                LocalDate.now(),
                premium
        ));*/
    }
}

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
	public void run(String... args) throws Exception {

		Usuario usuario = new Usuario("admin", "desweb");
		usuarioRepository.save(usuario);
		
		Categoria salgada = new Categoria("Salgada", "Salgadas");
		categoriaRepository.save(salgada);

		Categoria doce = new Categoria("Doce", "Doces");
		categoriaRepository.save(doce);

		Pizza pizza = new Pizza(
				"calabresa.png",
				"Calabresa",
				"calabresa",
				"1 unidade aprox. 750g",
				true,
				100,
				BigDecimal.valueOf(2.45),
				LocalDate.of(2023, 4, 26),
				salgada);
		pizzaRepository.save(pizza);

		
	}
}

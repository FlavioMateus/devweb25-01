import { useParams } from "react-router-dom";
import usePizzaStore from "../store/PizzaStore";
import useRecuperarPizzasPorSlugCategoriaComPaginacao from "../hooks/useRecuperarPizzasPorSlugCategoriaComPaginacao";
import { useEffect, useState } from "react";
import Pizza from "../interfaces/Pizza";
const agruparPizzasEmSlides = (pizzas: Pizza[], tamanhoDoSlide = 1) => {
  const slides: Pizza[][] = [];
  for (let i = 0; i < pizzas.length; i += tamanhoDoSlide) {
    slides.push(pizzas.slice(i, i + tamanhoDoSlide));
  }
  return slides;
};

const CarouselDePizzas = () => {
  const { slugCategoria } = useParams();
  const tamanho = usePizzaStore((s) => s.tamanho);

  const { data, isPending, error } = useRecuperarPizzasPorSlugCategoriaComPaginacao({
    tamanho: tamanho.toString(),
    slugCategoria: slugCategoria || "",
  });

  if (isPending) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar pizzas: {error.message}</p>;

  const pizzas = data.pages.flatMap((page) => page.itens);
  const slides = agruparPizzasEmSlides(pizzas, 1); // 1 pizza por slide (como seu exemplo HTML)

  return (
    <div id="carouselPizzas" className="carousel slide mb-5" data-bs-ride="carousel">
      <div className="carousel-inner">
        {slides.map((grupo, idx) => (
          <div key={idx} className={`carousel-item ${idx === 0 ? "active" : ""}`}>
            <div className="d-flex justify-content-center align-items-center" style={{ height: "500px" }}>
              {grupo.map((pizza) => (
                <div key={pizza.id} className="text-center">
                  <img
                    src={`/assets/${pizza.imagem}`}
                    alt={pizza.nome}
                    className="d-block mx-auto mb-3"
                    style={{ maxHeight: "300px", borderRadius: "1rem", objectFit: "cover" }}
                  />
                  <h3>{pizza.nome}</h3>
                  {pizza.descricao && <p className="text-muted">{pizza.descricao}</p>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselPizzas"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon"></span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselPizzas"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon"></span>
          </button>
        </>
      )}

      <div className="carousel-indicators">
        {slides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            data-bs-target="#carouselPizzas"
            data-bs-slide-to={idx}
            className={idx === 0 ? "active" : ""}
            aria-current={idx === 0}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default CarouselDePizzas;

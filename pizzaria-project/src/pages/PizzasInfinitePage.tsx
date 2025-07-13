import useRecuperarPizzasInfinito from "../hooks/useRecuperarPizzasInfinito";
import Card from "../components/Card";
import { useEffect, useRef } from "react";

const PizzasInfinitePage = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useRecuperarPizzasInfinito();

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) return <p>Carregando...</p>;
  if (isError) return <p>Erro: {error.message}</p>;

  return (
    <div className="container mt-4">
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {data?.pages.flatMap((pagina) =>
          pagina.itens.map((pizza) => (
            <div className="col" key={pizza.id}>
              <Card
                pizza={pizza}
                pizzaNoCarrinho={null}
                adicionarPizza={() => {}}
                subtrairPizza={() => {}}
              />
            </div>
          ))
        )}
      </div>
      {hasNextPage && (
        <div ref={observerRef} style={{ height: 80, textAlign: "center" }}>
          {isFetchingNextPage ? <p>Carregando mais...</p> : <p>Desça para carregar mais</p>}
        </div>
      )}
    </div>
  );
};

export default PizzasInfinitePage;

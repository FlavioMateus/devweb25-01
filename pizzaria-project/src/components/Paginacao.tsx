import { ReactNode } from "react";
import usePizzaStore from "../store/PizzaStore";
import useRecuperarPizzasComPaginacao from "../hooks/useRecuperarPizzasComPaginacao";

const Paginacao = () => {
  const pagina = usePizzaStore((s) => s.pagina);
  const tamanho = usePizzaStore((s) => s.tamanho);
  const nome = usePizzaStore((s) => s.nome);

  const setPagina = usePizzaStore((s) => s.setPagina);

  const {
    data: resultadoPaginado,
    isPending: carregandoPizzas,
    error: errorPizzas,
  } = useRecuperarPizzasComPaginacao({
    pagina: pagina.toString(),
    tamanho: tamanho.toString(),
    nome: nome,
  });

  const tratarPaginacao = (pagina: number) => {
    setPagina(pagina);
  };

  if (carregandoPizzas)
    return <p className="fw-bold">Carregando pizzas...</p>;
  if (errorPizzas) throw errorPizzas;

  const totalDePaginas: number = resultadoPaginado.totalDePaginas;

  const arrayDePaginas: ReactNode[] = [];

  for (let i = 0; i < totalDePaginas; i++) {
    arrayDePaginas.push(
      <li key={i} className={pagina === i ? "page-item active" : "page-item"}>
        <a
          onClick={() => tratarPaginacao(i)}
          className="page-link"
          aria-current="page"
        >
          {i + 1}
        </a>
      </li>
    );
  }

  if (totalDePaginas < 2) return;

  return (
    <nav aria-label="paginaco">
      <ul className="pagination">
        <li className={pagina === 0 ? "page-item disabled" : "page-item"}>
          <a onClick={() => tratarPaginacao(pagina - 1)} className="page-link">
            Anterior
          </a>
        </li>
        {arrayDePaginas}
        <li
          className={
            pagina === totalDePaginas - 1 ? "page-item disabled" : "page-item"
          }
        >
          <a onClick={() => tratarPaginacao(pagina + 1)} className="page-link">
            Próxima
          </a>
        </li>
      </ul>
    </nav>
  );
};
export default Paginacao;

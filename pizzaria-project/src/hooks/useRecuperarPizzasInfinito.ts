import { useInfiniteQuery } from "@tanstack/react-query";
import ResultadoPaginado from "../interfaces/ResultadoPaginado";
import Pizza from "../interfaces/Pizza";
import isErrorResponse from "../util/isErrorResponse";

const TAMANHO_PAGINA = 6;

const useRecuperarPizzasInfinito = (nome: string = "") => {
  return useInfiniteQuery<ResultadoPaginado<Pizza>, Error>({
    queryKey: ["pizzas", "infinito", nome],
    queryFn: async ({ pageParam = 0 }) => {
      const params = new URLSearchParams({
        pagina: pageParam.toString(),
        tamanho: TAMANHO_PAGINA.toString(),
        nome,
      });

      const response = await fetch(`http://localhost:8080/pizzas/paginacao?${params}`);

      if (!response.ok) {
        const error: any = await response.json();
        if (isErrorResponse(error)) throw error;
        throw new Error("Erro ao carregar pizzas");
      }

      return await response.json();
    },
    getNextPageParam: (lastPage) => {
      const proximaPagina = lastPage.paginaCorrente + 1;
      return proximaPagina < lastPage.totalDePaginas ? proximaPagina : undefined;
    },
    initialPageParam: 0,
  });
};

export default useRecuperarPizzasInfinito;

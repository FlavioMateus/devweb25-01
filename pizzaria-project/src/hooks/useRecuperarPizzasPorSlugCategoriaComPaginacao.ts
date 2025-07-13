import { keepPreviousData, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import ResultadoPaginado from "../interfaces/ResultadoPaginado";
import Pizza from "../interfaces/Pizza";
import isErrorResponse from "../util/isErrorResponse";

interface QueryString {  
  tamanho: string;
  slugCategoria?: string;
}

interface QueryStringComPagina {  
  pagina: string;
  tamanho: string;
  slugCategoria?: string;
}

const useRecuperarPizzasPorSlugCategoriaComPaginacao = (queryString: QueryString) => {
  
  const recuperarPizzasPorSlugCategoriaComPaginacao = 
    async (queryStringComPagina: QueryStringComPagina): Promise<ResultadoPaginado<Pizza>> => {
    
    // http://localhost:8080/pizzas/categoria/paginacao?pagina=0&tamanho=5&slugCategoria=frutas
    const response = await fetch("http://localhost:8080/pizzas/categoria/paginacao?" + 
      new URLSearchParams({
        // pagina: queryString.pagina,
        // tamanho: queryString.tamanho
        ...queryStringComPagina
      }));

    if (!response.ok) {
      const error: any = await response.json();
      if (isErrorResponse(error)) {
        throw error;
      } else {
        throw new Error(
          "Ocorreu um erro ao recuperar pizzas com paginação. Status code = " +
            response.status
        );
      }
    }
    return await response.json();
  };
  
  // http://localhost:8080/pizzas/categoria/paginacao?pagina=0&tamanho=5&slugCategoria=frutas
  return useInfiniteQuery({
    queryKey: ["pizzas", "categoria", "paginacao", queryString],
    queryFn: async ({pageParam}) => recuperarPizzasPorSlugCategoriaComPaginacao({
      pagina: pageParam.toString(),
      ...queryString
    }),
    staleTime: 0,
    placeholderData: keepPreviousData, // mostrar com e sem isso. Importante manter o setTimeout.
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.paginaCorrente < lastPage.totalDePaginas - 1 ? lastPage.paginaCorrente + 1 : undefined;
    }
  });
};
export default useRecuperarPizzasPorSlugCategoriaComPaginacao;

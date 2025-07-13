import { useQuery } from "@tanstack/react-query";
import Pizza from "../interfaces/Pizza";
import isErrorResponse from "../util/isErrorResponse";

const useRecuperarPizzaPorSlugCategoria = (slugCategororia?: string) => {
  const recuperarPizzaPorSlugCategoria = async (
    slugCategororia?: string
  ): Promise<Pizza[]> => {
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
    const response = await fetch(
      "http://localhost:8080/pizzas" +
        (slugCategororia ? "/categoria/" + slugCategororia : "")
    );
    if (!response.ok) {
      const error: any = await response.json();
      if (isErrorResponse(error)) {
        throw error;
      } else {
        throw new Error(
          "Ocorreu um erro ao recuperar os pizzas com slugCategororia = " +
            slugCategororia +
            ". Status code = " +
            response.status
        );
      }
    }
    return await response.json();
  };

  return useQuery({
    queryKey: slugCategororia
      ? ["pizzas", "categoria", slugCategororia]
      : ["pizzas"],
    queryFn: () => recuperarPizzaPorSlugCategoria(slugCategororia),
    staleTime: 10_000,
  });
};
export default useRecuperarPizzaPorSlugCategoria;

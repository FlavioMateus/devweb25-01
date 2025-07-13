import { useQuery } from "@tanstack/react-query";
import Pizza from "../interfaces/Pizza";
import isErrorResponse from "../util/isErrorResponse";

const useRecuperarPizzas = () => {
  const recuperarPizzas = async () => {
    const response = await fetch("http://localhost:8080/pizzas");
    if (!response.ok) {
      const error: any = await response.json();
      if (isErrorResponse(error)) {
        throw error;
      } else {
        throw new Error(
          "Ocorreu um erro ao recuperar pizzas. Status code = " +
            response.status
        );
      }
    }
    return (await response.json()) as Pizza[];
  };

  return useQuery({
    queryKey: ["pizzas"],
    queryFn: () => recuperarPizzas(),
    staleTime: 10_000,
  });
};
export default useRecuperarPizzas;

import { useQuery } from "@tanstack/react-query";
import Pizza from "../interfaces/Pizza";
import isErrorResponse from "../util/isErrorResponse";

const useRecuperarPizzaPorId = (id: number, removido: boolean) => {
  
  const recuperarPizzaPorId = async (id: number): Promise<Pizza> => {
    const response = await fetch("http://localhost:8080/pizzas/" + id);
    if (!response.ok) {
      const error: any = await response.json();
      if (isErrorResponse(error)) {
        throw error;
      } else {
        throw new Error(
          "Ocorreu um erro ao recuperar o pizza com id = " +
            id +
            ". Status code = " +
            response.status
        );
      }
    }
    return await response.json();
  };

  return useQuery({
    queryKey: ["pizza", id],
    queryFn: () => recuperarPizzaPorId(id),
    staleTime: 10_000,
    enabled: !removido
  });
};
export default useRecuperarPizzaPorId;

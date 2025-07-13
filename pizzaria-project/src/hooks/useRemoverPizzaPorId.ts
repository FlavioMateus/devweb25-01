import { useMutation } from "@tanstack/react-query";
import queryClient from "../main";
import isErrorResponse from "../util/isErrorResponse";

const removerPizzaPorId = async (id: number) => {
  const response = await fetch("http://localhost:8080/pizzas/" + id, {
    method: "DELETE",
  });
  if (!response.ok) {
    const error: any = await response.json();
    if (isErrorResponse(error)) {
      throw error;
    } else {
      throw new Error(
        "Ocorreu um erro ao remover a pizza com id = " +
          id +
          ". Status code = " +
          response.status
      );
    }
  }
  // return await response.json(); não retornar nada pois o back-end retorna void.
};

const useRemoverPizzaPorId = () => {
  return useMutation({
    mutationFn: (id: number) => removerPizzaPorId(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["pizzas"],
      });
      queryClient.invalidateQueries({
        queryKey: ["pizza", id],
      });
    },
  });
};
export default useRemoverPizzaPorId;

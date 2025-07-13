import { useMutation } from "@tanstack/react-query";
import Pizza from "../interfaces/Pizza";
import queryClient from "../main";
import isErrorResponse from "../util/isErrorResponse";

const cadastrarPizza = async (pizza: Pizza) => {
  const response = await fetch("http://localhost:8080/pizzas", {
    method: "POST",
    headers: {
      // tipo do conteúdo que o back-end espera receber
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify(pizza)
  });
    if (!response.ok) {
      const error: any = await response.json();
      if (isErrorResponse(error)) {
        throw error;
      } else {
        throw new Error(
          "Ocorreu um erro ao cadastrar um pizza. Status code = " +
            response.status
        );
      }
    }
  return await response.json(); 
};

const useCadastrarPizza = () => {
  return useMutation({
    mutationFn: (pizza: Pizza) => cadastrarPizza(pizza),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pizzas"]
      })
    }
  });
}
export default useCadastrarPizza;

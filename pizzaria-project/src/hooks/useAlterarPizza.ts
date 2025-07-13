import { useMutation } from "@tanstack/react-query";
import Pizza from "../interfaces/Pizza";
import queryClient from "../main";
import { alterarPizza } from "../util/api";



const useAlterarPizza = () => {
  return useMutation({
    mutationFn: (pizza: Pizza) => alterarPizza(pizza),
    onSuccess: (pizzAlterado: Pizza) => {
      queryClient.invalidateQueries({
        queryKey: ["pizzas"],
      });
      queryClient.invalidateQueries({
        queryKey: ["pizza", pizzAlterado.id],
      });
    },
  });
};
export default useAlterarPizza;

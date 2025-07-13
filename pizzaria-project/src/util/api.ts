// src/util/api.ts
import Pizza from "../interfaces/Pizza";
import isErrorResponse from "../util/isErrorResponse";

const API_URL = "http://localhost:8080/pizzas";

export const recuperarPizzaPorId = async (id: number): Promise<Pizza> => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error("Erro ao buscar pizza por ID");
  return await response.json();
};

export const alterarPizza = async (pizza: Pizza): Promise<Pizza> => {
        const response = await fetch("http://localhost:8080/pizzas", {
          method: "PUT",
          headers: {
            // tipo do conteúdo que o back-end espera receber
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pizza),
        });
        if (!response.ok) {
          const error: any = await response.json();
          if (isErrorResponse(error)) {
            throw error;
          } else {
            throw new Error(
              "Ocorreu um erro ao alterar um pizza. Status code = " + response.status
            );
          }
        }
        return await response.json();
      };

export const removerPizzaPorId = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Erro ao remover pizza");
};

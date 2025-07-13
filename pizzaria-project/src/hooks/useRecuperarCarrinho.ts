import { useQuery } from "@tanstack/react-query";
import { PizzCarrinho } from "../interfaces/PizzCarrinho";

const API = "http://localhost:8080";

export default function useRecuperarCarrinho(idUsuario: number) {
  return useQuery<PizzCarrinho[]>({
    queryKey: ["carrinho", idUsuario],
    queryFn: async () => {
      const res = await fetch(`${API}/usuarios/${idUsuario}/carrinho`);
      if (!res.ok) throw new Error("Erro ao recuperar carrinho");
      return res.json();
    },
    enabled: !!idUsuario,
  });
}

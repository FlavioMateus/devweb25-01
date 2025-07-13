import { useState, useEffect, useRef } from "react";
import useUsuarioStore from "../store/UsuarioStore";

export function useFavoritos() {
  const [favoritos, setFavoritos] = useState<number[]>([]);
  const { usuarioLogado } = useUsuarioStore();
  const chaveRef = useRef(""); // ← manter a chave fixa durante o ciclo

  useEffect(() => {
    if (usuarioLogado > 0) {
      chaveRef.current = `favoritos_usuario_${usuarioLogado}`;
      const favs = localStorage.getItem(chaveRef.current);
      if (favs) setFavoritos(JSON.parse(favs));
      else setFavoritos([]); // ← garante que zera se não tem
    }
  }, [usuarioLogado]);

  function toggleFavorito(id: number) {
    if (usuarioLogado <= 0) return;

    const atualizados = favoritos.includes(id)
      ? favoritos.filter((f) => f !== id)
      : [...favoritos, id];

    localStorage.setItem(chaveRef.current, JSON.stringify(atualizados));
    setFavoritos(atualizados); // ← novo array para forçar re-render
  }

  function isFavorito(id: number) {
    return favoritos.includes(id);
  }

  return { favoritos, toggleFavorito, isFavorito };
}

import { COMBINACIONES_GANADORAS } from "../constantes";

export const verificarGanador = (tablero) => {
  for (const combinacion of COMBINACIONES_GANADORAS) {
    let [a, b, c] = combinacion;
    if (
      tablero[a] &&
      tablero[a] === tablero[b] &&
      tablero[a] === tablero[c]
    ) {
      //asignamos el ganador en caso exista
       return tablero[a];
    }
  }
  return false; // retornamos false si no hay ganador aun
};

export const verificarJuegoTerminado = (tablero) => {
  //verificamos si todas las casillas estan ya seleccionadas
  return tablero.every((item) => item !== null);
};
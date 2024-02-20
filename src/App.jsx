import { useState, useEffect } from "react";
import "./App.css";
import Confetti from "react-confetti";
import { TURNOS } from "./constantes";
import BotonResetear from "./components/ButtonReset";
import {
  verificarGanador,
  verificarJuegoTerminado,
} from "./logistic/gameLogic";

function Cuadrado({ actualizarTablero, children, index, isSelected }) {
  const handleClick = () => {
    actualizarTablero(index);
  };
  return (
    <div
      onClick={handleClick}
      className={`cuadrado ${isSelected ? "active" : ""}`}
    >
      {children}
    </div>
  );
}
function App() {
  const [tablero, setTablero] = useState(new Array(9).fill(null));
  const [turno, setTurno] = useState(TURNOS.o);
  const [ganador, setGanador] = useState(false);

  useEffect(() => {
    window.localStorage.getItem("turno") &&
      setTurno(window.localStorage.getItem("turno"));
    window.localStorage.getItem("turno") &&
      setTablero(JSON.parse(window.localStorage.getItem("tablero")));
  }, []);

  const actualizarTablero = (index) => {
    const tableroNuevo = [...tablero]; // hacemos una copia del tablero
    tableroNuevo[index] = turno; // actualizamos la posicion del tablero
    setTablero(tableroNuevo); //seteamos nuevo tablero

    const turnoNuevo = turno === TURNOS.o ? TURNOS.x : TURNOS.o; // cambiamos el turno
    setTurno(turnoNuevo); // actualizamos el turno
    setTimeout(() => {
      let ganador = verificarGanador(tableroNuevo);
      ganador && setGanador(ganador); // asignamos el ganador en caso lo haya
      let findeljuego = verificarJuegoTerminado(tableroNuevo); // validamos si aun hay casillas disponibles
      if (findeljuego) {
        setGanador("EMPATE"); // en caso termine el juego, seteamos ganador a EMPATE
      }
    }, 10);

    //localStorage
    window.localStorage.setItem("turno", turnoNuevo);
    window.localStorage.setItem("tablero", JSON.stringify(tableroNuevo));
  };

  const resetearJuego = () => {
    //reiniciamos los valores a la configuracion por default
    setTablero(new Array(9).fill(null));
    setTurno(TURNOS.o);
    setGanador(false);

    //eliminar datos del localstorage
    window.localStorage.removeItem("turno");
    window.localStorage.removeItem("tablero");
  };

  return (
    <>
      {ganador && <Confetti style={{ opacity: ".2", zIndex: "99" }} />}
      <h1 style={{ margin: "1rem 0" }}> <p>Tres en raya ### </p><span style={{fontSize:"15px"}}>created by : Joel Soto Z.</span></h1>
      <BotonResetear resetearJuego={resetearJuego}>
        Resetear Juego
      </BotonResetear>
      <div className="game">
        {tablero.map((cuadrado, index) => {
          return (
            <Cuadrado
              key={index}
              index={index}
              actualizarTablero={actualizarTablero}
            >
              {cuadrado}
            </Cuadrado>
          );
        })}
      </div>
      <div className="turnos">
        <Cuadrado isSelected={turno === TURNOS.o}>{TURNOS.o}</Cuadrado>
        <Cuadrado isSelected={turno === TURNOS.x}>{TURNOS.x}</Cuadrado>
      </div>
      {ganador && (
        <>
          <div className="ganador">
            <div className="mensajeGanador"> Ganador del juego : {ganador}</div>
            <BotonResetear resetearJuego={resetearJuego}>
              Empezar de nuevo !
            </BotonResetear>
          </div>
        </>
      )}
    </>
  );
}

export default App;

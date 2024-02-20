export default function BotonResetear({ children, resetearJuego }) {
  return (
    <button className="resetGame" onClick={() => resetearJuego()}>
      {children}
    </button>
  );
}

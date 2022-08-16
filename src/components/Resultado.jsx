import { useCallback, useMemo, useRef } from "react";
import useCotizador from "../hooks/useCotizador";
import { MARCAS, PLANES } from "../constants";

const Resultado = () => {
  const { resultado, datos } = useCotizador();
  const { marca, plan, year } = datos;
  // use Ref es para  regresar un objeto mutable , en este caso congela este valor de year para que no mute al momento de cambiar, de año
  // esto se mantiene hasta que el ciclo de vida del componente termine
  const yearRef = useRef(year);
  // useCallback lo usamos para que se ejecute esa función dependiendo de cuando cambie el arreglo de dependencias
  // la forma de usar use callback es: useCallback(fn, deps) es igual a useMemo(() => fn, deps).
  // use memo es lo mismo que callback, se asimila a un useEfeect, solo que use memo usa un arrow function solo que use memo es una optimización en el rendimiento
  // hasta que cambie resultado, nombre de marca ya no cambiará
  const [nombreMarca] = useCallback(
    MARCAS.filter((m) => m.id === Number(marca)),
    [resultado]
  );
  const [nombrePlan] = useMemo(
    () => PLANES.filter((p) => p.id === Number(plan)),
    [resultado]
  );
  if (resultado === 0) return null;
  return (
    <div className="bg-gray-100 text-center mt-5 p-5 shadow">
      <h2 className="text-gray-600 font-black text-3xl ">Resumen:</h2>
      <p className="my-2">
        <span className="font-bold ">Marca: </span>
        {nombreMarca.nombre}
      </p>
      <p className="my-2">
        <span className="font-bold ">Plan: </span>
        {nombrePlan.nombre}
      </p>
      <p className="my-2">
        <span className="font-bold ">Año del Auto: </span>
        {/* yearRef.current es su valor actual */}
        {yearRef.current}
      </p>
      <p className="my-2 text-2xl ">
        <span className="font-bold ">Total Cotización: </span>
        {resultado}
      </p>
    </div>
  );
};

export default Resultado;

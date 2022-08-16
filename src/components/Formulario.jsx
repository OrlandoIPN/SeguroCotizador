import { Fragment } from "react";
import { MARCAS, YEARS, PLANES } from "../constants";
import useCotizador from "../hooks/useCotizador";
import Error from "./Error";

const Formulario = () => {
  //que contexto vamos a usar va dentro de  useContext(contexto a usar)
  // const { modal, cambiarState } = useContext(CotizadorContext) --> esta es una forma de hacerlo más pesada
  // const { modal, cambiarState } = useCotizador()
  /* que vamos a usar {hola}*/
  // Context no se debe de utilizar cuando solo vas a usar un state en un lado

  const { setError, error, datos, handleChangeDatos, cotizarSeguro } =
    useCotizador();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Object.values te permite revisar los valores de un objeto a diferencia de key
    // key solo permite saber si esta vacio
    if (Object.values(datos).includes("")) {
      setError("Todos los campos son obligatorios");
      return;
    }
    setError("");

    //   COTIZAR

    cotizarSeguro();
  };

  return (
    <>
      {error && <Error />}
      <form onSubmit={handleSubmit}>
        <div className="my-5">
          <label className="block font-bold text-gray-400 uppercase">
            Marca
          </label>
          <select
            name="marca"
            className="w-full p-3 bg-white border border-gray-200"
            onChange={(e) => handleChangeDatos(e)}
            value={datos.marca}
          >
            <option value="">--Seleccione Marca--</option>
            {MARCAS.map((marca) => (
              <option key={marca.id} value={marca.id}>
                {marca.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="my-5">
          <label className="block font-bold text-gray-400 uppercase">Año</label>
          <select
            name="year"
            className="w-full p-3 bg-white border border-gray-200"
            onChange={(e) => handleChangeDatos(e)}
            value={datos.year}
          >
            <option value="">--Seleccione Año--</option>
            {YEARS.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="my-5">
          <label className="block font-bold text-gray-400 uppercase">
            Elige un Plan
          </label>
          <div className="flex gap-3 items-center">
            {PLANES.map((plan) => (
              <Fragment key={plan.id}>
                <label>{plan.nombre}</label>
                <input
                  type="radio"
                  name="plan"
                  value={plan.id}
                  onChange={(e) => handleChangeDatos(e)}
                />
              </Fragment>
            ))}
          </div>
        </div>

        <input
          type="submit"
          className="w-full bg-indigo-500 hover:bg-indigo-600 transition-colors text-white cursor-pointer p-3 uppercase font-bold"
          value="Cotizar"
        />
      </form>
    </>
  );
};

export default Formulario;

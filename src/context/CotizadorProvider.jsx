import { calcularMarca, calcularPlan, formatearDinero } from "../helpers";
import { obtenerDiferenciaYear } from "../helpers";
import { createContext, useState } from "react";
//sirve para crear un context
const CotizadorContext = createContext();

// el provider es el lugar donde podemos tener el state donde podemos tener effects y funciones
// es de donde nacen o vienen los datos o cual es la fuente de los datos
// es similar a un hook o a un componente de react

const CotizadorProvider = ({ children }) => {
  // aqui pueden haber states, effects y demas,
  const [datos, setDatos] = useState({
    marca: "",
    year: "",
    plan: "",
  });

  const [error, setError] = useState("");
  const [resultado, setResultado] = useState(0);
  const [cargando, setCargando] = useState(false);

  const handleChangeDatos = (e) => {
    setDatos({
      // el operador spread es para tomar una copia de lo que hay
      //  y añadirle información si no lo añadimos esto se borrara
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const cotizarSeguro = () => {
    // Base
    let resultado = 2000;
    // Obtener Diferencia de años
    const diferencia = obtenerDiferenciaYear(datos.year);
    // Hay que restar el 3% por año
    resultado -= (diferencia * 3 * resultado) / 100;

    // Europeo 30%
    // Americano 15%
    // Asiatico 5%
    resultado *= calcularMarca(datos.marca);

    // Basico 20 %
    // Completo 50%
    resultado *= calcularPlan(datos.plan);
    // toFixed es para redondeat con decimales una cantidad
    // resultado = resultado.toFixed(2);
    // console.log(resultado);

    // Formatear Dinero
    resultado = formatearDinero(resultado);
    setCargando(true);
    setTimeout(() => {
      setResultado(resultado);
      setCargando(false);
    }, 3000);
  };

  return (
    <CotizadorContext.Provider
      value={{
        /*aqui vendra a lo que vamos a poder acceder */
        datos,
        handleChangeDatos,
        error,
        setError,
        cotizarSeguro,
        resultado,
        cargando,
      }}
    >
      {children}
    </CotizadorContext.Provider>
  );
};

// export es para exportar el provider
// y el export default que sera el context

// si se mira bien lo que hago es que paso el context dentro de la funcion para para pasar el contexto
// dentro de ella y a esa le paso el provider de esa forma se conectan para ser usado en otros lugares
// EL PROVIDER ES EN DONDE SALEN LOS DATOS
//
export { CotizadorProvider };
export default CotizadorContext;

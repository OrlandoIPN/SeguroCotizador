import { useContext } from "react";
import CotizadorContext from "../context/CotizadorProvider";

// hook de cotizador para usar contex
// cuando lo mando a llamar va a usar el context y buscarlo asi ahorras pasos

const useCotizador = () => {
  return useContext(CotizadorContext);
};

export default useCotizador;

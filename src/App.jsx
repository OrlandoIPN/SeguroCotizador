import AppSeguro from "./components/AppSeguro"
import { CotizadorProvider } from "./context/CotizadorProvider"



function App() {
  return (
    //los componentes que tenga el provider dentro estaran disponibles en todo lado
    <CotizadorProvider>
      <AppSeguro />
    </CotizadorProvider>
    
  )
}

export default App

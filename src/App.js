import {BrowserRouter,Switch,Route} from 'react-router-dom'
import SemanaCompleta from './Components/SemanaCompleta'
import SemanaProvider from './Context/SemanaProvider'
import LocalizacionProvider from './Context/LocalizacionProvider'
import Home from './Pages/Home'

function App() {
  return (
      <BrowserRouter>
      <SemanaProvider>
        <LocalizacionProvider>
          <Switch>
            <Route exact path =  "/" component = {Home} />
            <Route exact path = "/scomp" component = {SemanaCompleta} />
          </Switch>
        </LocalizacionProvider>
      </SemanaProvider>
      </BrowserRouter>
  );
}

export default App;

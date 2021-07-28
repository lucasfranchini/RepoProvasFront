import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import GlobalStyles from "./styles/GlobalStyle";


function App() {
  return (
    <BrowserRouter>
    <GlobalStyles/>
      <Switch>
        <Route path='/' exact>
          <Home/>
        </Route>
        <Route path='/create' exact>
          <Home/>
        </Route>
        <Route path='/search' exact>
          <Home/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

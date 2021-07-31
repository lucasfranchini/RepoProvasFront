import { BrowserRouter, Route, Switch } from "react-router-dom";
import CreateTest from "./components/CreateTest";
import Options from "./components/Options";
import GlobalStyles from "./styles/GlobalStyle";
import Search from "./components/Search";


function App() {
  return (
    <BrowserRouter>
    <GlobalStyles/>
      <Switch>
        <Route path='/' exact>
          <Options/>
        </Route>
        <Route path='/create' exact>
          <CreateTest/>
        </Route>
        <Route path='/options' exact>
          <Options/>
        </Route>
        <Route path='/search/:type' exact>
          <Search/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

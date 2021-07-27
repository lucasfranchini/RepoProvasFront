import { BrowserRouter, Route, Switch } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyle";


function App() {
  return (
    <BrowserRouter>
    <GlobalStyles/>
      <Switch>
        <Route path='/' exact>

        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

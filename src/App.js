import "./App.css";
import User from "./User";
import Login from "./login";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/login" />
        <Route
          path="/login"
          render={(routeProps) => <Login {...routeProps} />}
        />
        <Route
          path="/home"
          exact
          render={(routeProps) => <User {...routeProps} />}
        />
      </Switch>
    </Router>
  );
}

export default App;

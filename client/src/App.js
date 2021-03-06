import "./App.css";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import About from "./components/About/About";
import Results from "./components/Results/Results";
import Help from "./components/Help/Help";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/results" component={Results} />
        <Route exact path="/help" component={Help} />
      </Switch>
      <Footer />
    </Router>
  );
}

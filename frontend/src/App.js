import './bootstrap.min.css'

import { Container } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom'

import { NavTop } from "./components/NavTop";
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { SeedPage } from './pages/SeedPage';
import { CartPage } from './pages/CartPage';
import { Login } from './pages/Login';
import { Register } from './pages/Register';


function App() {
  return (
    <>
      <NavTop/>
      <main>
        <Container>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/seed/:slug" component={SeedPage} />
            <Route exact path="/cart/:slug?" component={CartPage} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;

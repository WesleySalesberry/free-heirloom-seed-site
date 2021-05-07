import './bootstrap.min.css'

import { Container } from 'react-bootstrap';
import { Route } from 'react-router-dom'

import { NavTop } from "./components/NavTop";
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { SeedPage } from './pages/SeedPage';
import { CartPage } from './pages/CartPage';


function App() {
  return (
    <>
      <NavTop/>
      <main>
        <Container>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/seed/:slug" component={SeedPage} />
          <Route exact path="/cart/:slug?" component={CartPage} />
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;

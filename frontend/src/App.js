import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Header from './components/Header';
import Footer from './components/Footer';
import Homepage from './containers/Homepage';
import ProductPage from './containers/ProductPage';

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" exact component={Homepage} />
          <Route path="/product/:id" component={ProductPage} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

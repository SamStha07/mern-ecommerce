import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

// import PrivateRoute from './components/HOC/PrivateRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import Homepage from './containers/Homepage';
import ProductPage from './containers/ProductPage';
import CartPage from './containers/CartPage';
import LoginPage from './containers/LoginPage';
import RegisterPage from './containers/RegisterPage';
import ProfilePage from './containers/ProfilePage';
import UserListPage from './containers/UserListPage';

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" exact component={Homepage} />
          <Route path="/product/:id" exact component={ProductPage} />
          <Route path="/cart/:id?" exact component={CartPage} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/register" exact component={RegisterPage} />
          <Route path="/profile" exact component={ProfilePage} />
          <Route path="/admin/userlist" exact component={UserListPage} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

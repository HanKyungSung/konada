import { BrowserRouter as Router, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import { Container } from 'react-bootstrap';
import HomeScreen from './screens/HomeScreen';
import PostScreen from './screens/PostScreen';
import ProductScreen from './screens/ProductScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ProfileEditScreen from './screens/ProfileEditScreen';
import PostingScreen from './screens/PostingScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/product/:id" component={ProductScreen} exact />
          <Route path="/post/:id" component={PostScreen} exact />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route
            exact
            path="/user/profile/:userId/show"
            component={ProfileScreen}
          />
          <Route
            exact
            path="/user/profile/:userId/edit"
            component={ProfileEditScreen}
          />
          <Route path="/posting" component={PostingScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;

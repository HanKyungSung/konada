import { BrowserRouter as Router, Route } from 'react-router-dom';
import Footer from './components/common/Footer';
import Header from './components/common/Header';
import { Container } from 'react-bootstrap';
import HomeScreen from './components/home/HomeScreen';
import PostScreen from './components/post/PostScreen';
import LoginScreen from './components/auth/LoginScreen';
import RegisterScreen from './components/auth/RegisterScreen';
import PostUpload from './components/post/upload/PostUpload';
import DateTime from './components/post/upload/DateTime';
import Location from './components/post/upload/Location';

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/post/:id" component={PostScreen} exact />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/upload" component={PostUpload} />
          <Route path="/upload/date" component={DateTime} />
          <Route path="/upload/location" component={Location} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;

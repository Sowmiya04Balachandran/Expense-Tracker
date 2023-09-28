import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './Login/Login'; // Make sure this import is correct
import Home from './Home/Home';
import MainNavigation from './MainNavigation';

function App() {
  return (
    <Router>
      <MainNavigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<LoginForm />} />
      </Routes>
    </Router>
  );
}

export default App;


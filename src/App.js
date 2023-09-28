import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './Login/Login'; // Make sure this import is correct
import Home from './Home/Home';
import MainNavigation from './MainNavigation';
import Profile from './Profile/Profile';

function App() {
  return (
    <Router>
      <MainNavigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<LoginForm />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './Login/Login'; // Make sure this import is correct
import Home from './Home/Home';
import MainNavigation from './MainNavigation';
import Profile from './Profile/Profile';
import AuthContextProvider from './store/AuthContextProvider';

function App() {
  return (
    <AuthContextProvider>
    <Router>
      <MainNavigation />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<LoginForm />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    
    </Router>
    </AuthContextProvider>
  );
}

export default App;


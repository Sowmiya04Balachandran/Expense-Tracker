

import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'; // Use BrowserRouter as Router
import Home from './Home/Home';
import AuthContextProvider from './store/AuthContextProvider.js';
//import UpdateDetail from './UpdateDetail/UpdateDetail';
import Profile from './Profile/Profile';
import Login from './Login/Login';
import ForgotPassword from './Login/ForgotPassword';
import Expenses from './Expenses/Expenses';

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes> {/* Use Routes to define your routes */}
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login/>}/>
         
          <Route path="/completeprofile" element={<Profile />} />
          <Route path="/forgotpassword" element={<ForgotPassword/>}/>
          <Route path='/Expenses' element={<Expenses/>}/>
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;

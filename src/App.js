// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import LoginForm from './Login/Login'; // Make sure this import is correct
// import Home from './Home/Home';
// import MainNavigation from './MainNavigation';
// import Profile from './Profile/Profile';
// import AuthContextProvider from './store/AuthContextProvider';

// function App() {
//   return (
//     <AuthContextProvider>
//     <Router>
//       <MainNavigation />
      
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/Login" element={<LoginForm />} />
//         <Route path="/profile" element={<Profile />} />
//       </Routes>
    
//     </Router>
//     </AuthContextProvider>
//   );
// }

// export default App;

import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'; // Use BrowserRouter as Router
import Home from './Home/Home';
import AuthContextProvider from './store/AuthContextProvider.js';
import UpdateProfile from './UpdateDetail/UpdateDetail';
import Profile from './Profile/Profile';
import Login from './Login/Login';
import ForgotPassword from './Login/ForgotPassword';

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes> {/* Use Routes to define your routes */}
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login/>}/>
          <Route path="/updateprofile" element={<UpdateProfile />} />
          <Route path="/completeprofile" element={<Profile />} />
          <Route path="/forgotpassword" element={<ForgotPassword/>}/>
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;

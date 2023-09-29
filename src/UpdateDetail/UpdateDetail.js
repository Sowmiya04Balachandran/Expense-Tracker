import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/completeprofile">Complete Your Profile</Link>
            </li>
          </ul>
        </nav>
      </header>
      <h1>Welcome to the Expense Tracker</h1>
      {/* Add your home content here */}
    </div>
  );
};

export default Home;

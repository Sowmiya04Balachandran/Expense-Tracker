import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Login.module.css';

const Login = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);


  // Define the refs for input elements
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current.value;

    setIsLoading(true);
    let url;

    if (isLogin) {
      // Handle login logic here
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCgl1Kkkaw7_gJny8ISnqxhFean3l_05B8';
    } else {
      if (enteredPassword !== enteredConfirmPassword) {
        alert('Passwords do not match.');
        setIsLoading(false);
        return;
      }

      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCgl1Kkkaw7_gJny8ISnqxhFean3l_05B8';
    }

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          // Account created successfully or logged in, Firebase handles user details
          console.log(res);
          navigate('/');
        } else {
          return res.json().then((data) => {
            let errorMessage = 'Authentication error';
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        {isLogin ? null : (
          <div className={classes.control}>
            <label htmlFor='confirm-password'>Confirm Password</label>
            <input
              type='password'
              id='confirm-password'
              required
              ref={confirmPasswordInputRef}
            />
          </div>
        )}
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? 'Login' : 'Create Account'}</button>
          )}
          {isLoading && <p>Sending Request.....</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Login with an existing account' : 'Switch to Login'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;

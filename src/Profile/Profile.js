// import React, { useContext, useRef } from 'react';
// import AuthContext from '../store/AuthContext';
// import './Profile.css';

// const Profile = () => {
//     const authCtx = useContext(AuthContext);
//     const nameInputRef = useRef();
//     const imageInputRef = useRef();

//     const submitHandler = async (event) => {
//         event.preventDefault();
//         const enteredName = nameInputRef.current.value;
//         const photoUrl = URL.createObjectURL(imageInputRef.current.files[0]);

//         if (!photoUrl) {
//             alert("Please upload a photo.");
//             return;
//         }

//         const toke = authCtx.token;

//         try {
            // const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCgl1Kkkaw7_gJny8ISnqxhFean3l_05B8', {
            //     method: 'POST',
            //     body: JSON.stringify({
            //         idToken: toke,
            //         displayName: enteredName,
            //         photoUrl: photoUrl,
            //         deleteAttribute: ["DISPLAY_NAME"],
            //         returnSecureToken: true
            //     }),
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            // });

            // if (response.ok) {
            //     alert("Profile updated successfully");
            // } else {
            //     console.log(response);
            //     alert("Profile update failed");
            // }
//         } catch (error) {
//             console.error("An error occurred:", error);
//         }
//     };

//     return (
//       <form onSubmit={submitHandler} className="profile-form"> {/* Apply the CSS class to the form */}
//       <div className="mb-3">
//           <label htmlFor="name" className="form-label">Name</label> {/* Apply the CSS class to the label */}
//           <input type="text" id="name" className="form-control" placeholder="Name" ref={nameInputRef} /> {/* Apply the CSS class to the input */}
//       </div>

//       <div className="mb-3">
//           <label htmlFor="photo" className="form-label">Update your photo</label> {/* Apply the CSS class to the label */}
//           <input type="file" id="photo" className="form-control" ref={imageInputRef} /> {/* Apply the CSS class to the input */}
//       </div>

//       <button type="submit" className="btn-primary">Update details</button> {/* Apply the CSS class to the button */}
//   </form>
//     );
// };

// export default Profile;


import React, { useRef, useContext, useState, useEffect } from 'react';
//import { Button, Form } from 'react-bootstrap';
import AuthContext from '../store/AuthContext';

const Profile = () => {
  const authCtx = useContext(AuthContext);
  const nameInputRef = useRef();
  const imageInputRef = useRef();

  const [userData, setUserData] = useState({
    displayName: '',
    photoUrl: ''
  });

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const photoUrl = URL.createObjectURL(imageInputRef.current.files[0]);

    if (!photoUrl) {
      console.log("Upload an image");
      return;
    }

    const token = authCtx.token;

    try {
      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCgl1Kkkaw7_gJny8ISnqxhFean3l_05B8', {
        method: 'POST',
        body: JSON.stringify({
          idToken: token,
          displayName: enteredName,
          photoUrl: photoUrl,
          deleteAttribute: ["DISPLAY_NAME"],
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    
      if (response.ok) {
        alert("Profile updated successfully");
      } else {
        const responseData = await response.json();
        console.log(response.status); // Should print 400
        console.log(responseData.error.message); // Specific error message from Firebase
        alert("Profile update failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
    
  };

  const verifyEmailHandler = async () => {
    try {
      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCgl1Kkkaw7_gJny8ISnqxhFean3l_05B8', {
        method: 'POST',
        body: JSON.stringify({
          requestType: 'VERIFY_EMAIL',
          idToken: authCtx.token
        }),
        headers: {
          'Content-Type': 'application/json',
          'X-Firebase-Locale': 'en' // Set the language to English
        }
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCgl1Kkkaw7_gJny8ISnqxhFean3l_05B8', {
      method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.token
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (response.ok) {
          console.log(response);
          return response.json();
        }
        throw new Error("Failed to fetch user data");
      })
      .then((data) => {
        const user = data.users[0];
        if (user) {
          setUserData({
            displayName: user.displayName || '',
            photoUrl: user.photoUrl || ''
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [authCtx.token]);

  return (
    <div>
    <form onSubmit={submitHandler} className="profile-form">
      <div controlId="name">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          placeholder="Name"
          ref={nameInputRef}
          defaultValue={userData.displayName || ''}
        />
      </div>
  
      <div>
        <label htmlFor="photo">Update your photo</label>
        <input type="file" ref={imageInputRef} />
        {userData.photoUrl ? (
          <img src={userData.photoUrl} alt="Profile" />
        ) : (
          <p>No profile picture available</p>
        )}
      </div>
  
      <button type="submit">Update details</button>
    </form>
  
    <button onClick={verifyEmailHandler}>Verify email</button>
  </div>
  
  );
};

export default Profile;

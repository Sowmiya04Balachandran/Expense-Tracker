// // src/utils/api.js
// import firebase from 'firebase/app';
// import 'firebase/firestore';

// export async function fetchUserProfile(userId) {
//   try {
//     const userProfileRef = firebase.firestore().collection('userProfiles').doc(userId);
//     const userProfileSnapshot = await userProfileRef.get();

//     if (userProfileSnapshot.exists) {
//       return userProfileSnapshot.data();
//     }

//     return null; // User profile not found
//   } catch (error) {
//     console.error('Error fetching user profile:', error);
//     throw error;
//   }
// }
import React from 'react'
import MainNavigation from '../MainNavigation';
import Login from '../Login/Login';
const Home = () => {
    return (
        <div>
            <MainNavigation />
            <Login />
        </div>



    )
}

export default Home
import React, { useContext, useRef } from 'react';
import AuthContext from '../store/AuthContext';

const CompleteProfile = () => {
    const authCtx = useContext(AuthContext);
    const nameInputRef = useRef();
    const imageInputRef = useRef();

    const submitHandler = async (event) => {
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const photoUrl = URL.createObjectURL(imageInputRef.current.files[0]);

        if (!photoUrl) {
            alert("Please upload a photo.");
            return;
        }

        const toke = authCtx.token;

        try {
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCgl1Kkkaw7_gJny8ISnqxhFean3l_05B8', {
                method: 'POST',
                body: JSON.stringify({
                    idToken: toke,
                    displayName: enteredName,
                    photoUrl: photoUrl,
                    deleteAttribute: ["DISPLAY_NAME"],
                    returnSecureToken: true
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert("Profile updated successfully");
            } else {
                console.log(response);
                alert("Profile update failed");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    return (
        <form onSubmit={submitHandler}>
            <div className="mb-3">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="Name" ref={nameInputRef} />
            </div>

            <div className="mb-3">
                <label htmlFor="photo">Update your photo</label>
                <input type="file" id="photo" ref={imageInputRef} />
            </div>

            <button type="submit">Update details</button>
        </form>
    );
};

export default CompleteProfile;

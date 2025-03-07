import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from "@react-oauth/google";
import './LoginSignup.css';

const LoginSignup = () => {
    const navigate = useNavigate();

    const login = useGoogleLogin({
        onSuccess: (credentialResponse) => {
            console.log(credentialResponse); // Logs the authentication response
            navigate('/upload'); // Navigate to the upload page after successful login
        },
        onError: () => console.log("Login Failed"),
    });

    return(
        <div className='container'>
            <div className="header">
                <div className="website-title">cheveningbrew.com</div>
            </div>
            <div className="inputs">
                <button className="custom-google-btn" onClick={() => login()}>
                    <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" />
                    Continue with Google
                </button>
            </div>
        </div>
    );
}

export default LoginSignup;

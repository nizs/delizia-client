import axios from 'axios';
import { GoogleAuthProvider } from 'firebase/auth';
import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';


const SocialLogin = () => {
    const { socialSignin } = useAuth();
    const axiosPublic = useAxiosPublic();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const handleGoogleSignin = () => {
        const googleProvider = new GoogleAuthProvider();

        socialSignin(googleProvider)
            .then(result => {
                console.log(result.user);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    photoURL: result.user?.photoURL
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        navigate(from, { replace: true });
                    })
            })
    }

    return (
        <div>
            <div className="mt-6">
                <button onClick={handleGoogleSignin} className="btn btn-error w-full">
                    <FaGoogle />
                    Sign in with Google</button>
            </div>
        </div>
    );
};

export default SocialLogin;
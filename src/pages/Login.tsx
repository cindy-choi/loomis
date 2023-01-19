import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/firebase';
import { useLocation, useNavigate } from 'react-router-dom';

function Login() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        navigate(location.state?.from || '/');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <button onClick={handleLogin}>구글 아이디로 로그인</button>
    </div>
  );
}

export default Login;

import React from "react";
import "./styles/Auth.css";
import { auth, provider } from "../db/firebase-config";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const Auth = ({ setIsAuth }) => {
  const signInGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="Auth">
        <p className="Auth-text">Sign-In with Google</p>
        <button className="Auth-sign-in" onClick={signInGoogle}>
          Sign-In Google
        </button>
      </div>
    </>
  );
};

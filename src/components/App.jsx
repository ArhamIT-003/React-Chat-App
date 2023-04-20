import React from "react";
import { useState } from "react";
import { Auth } from "./Auth";
import "./styles/App.css";
import Cookies from "universal-cookie";
import Room from "./Room";
import { Chat } from "./chat";
import { signOut } from "firebase/auth";
import { auth } from "../db/firebase-config";

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  };

  if (!isAuth) {
    return (
      <div>
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }

  return (
    <div>
      {room ? (
        <Chat room={room} signUserOut={signUserOut} />
      ) : (
        <Room setRoom={setRoom} />
      )}
    </div>
  );
}

export default App;

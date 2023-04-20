import React from "react";
import "./styles/rooms.css";
import { useRef } from "react";

const Room = ({ setRoom }) => {
  const roomInputRef = useRef();

  const handleRoom = () => {
    const newRoom = roomInputRef.current.value;
    setRoom(newRoom);
  };
  return (
    <div className="container">
      <div className="rooms">
        <label htmlFor="Room">Enter Room Name:</label>
        <input name="Room" placeholder="Add Room" ref={roomInputRef} />
        <button onClick={handleRoom}>Add</button>
      </div>
    </div>
  );
};

export default Room;

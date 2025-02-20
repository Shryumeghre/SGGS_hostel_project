import React from "react";
import { useNavigate } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "./GuestRoom.css";

const images = ["/images/slide1.jpg", "/images/slide2.jpg"]; // Add correct image paths

const GuestRoomSection = () => {
  const navigate = useNavigate();

  return (
    <div className="guest-room-container">
      <Slide easing="ease">
        {images.map((image, index) => (
          <div className="each-slide" key={index}>
            <img src={image} alt={`Guest Room ${index + 1}`} />
          </div>
        ))}
      </Slide>

      <div className="guest-room-text">
        <h2>Guest Room</h2>
        <button onClick={() => navigate("/guestRoom")}>Click here to book now</button>
      </div>
    </div>
  );
};

export default GuestRoomSection;

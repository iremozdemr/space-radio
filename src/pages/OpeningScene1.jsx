import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/OpeningScene1.css'; 

const OpeningScene1 = () => {
  const [currentImage, setCurrentImage] = useState('./scene1.jpg'); // Initial image
  const navigate = useNavigate();

  useEffect(() => {
    // Set a timeout to change the image after 3 seconds
    const timer = setTimeout(() => {
      setCurrentImage('./scene2.jpg'); // Change to scene2.jpg after 3 seconds
    }, 4000);

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []); // Empty dependency array means this runs once after component mounts

  const handleButtonClick = () => {
    navigate('/OpeningScene2'); // Redirect to '/OpeningScene2' on button click
  };

  return (
    <div className='image-button-container'>
      <img src={currentImage} alt="Scene" /> {/* Dynamically changing image */}
      <button onClick={handleButtonClick}>Go to Other Screen</button> {/* Navigate to another screen on click */}
    </div>
  );
};

export default OpeningScene1;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/OpeningScene1.css';

const OpeningScene1 = () => {
  const [currentImage, setCurrentImage] = useState('./scene1.jpg'); // Initial image
  const [isFading, setIsFading] = useState(false); // Track fading state
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFading(true); // Start fading out
    }, 3000); // Wait for 3 seconds before fading out the first image

    const imageChangeTimer = setTimeout(() => {
      setCurrentImage('./scene2.jpg'); // Change to the second image after fade-out
      setIsFading(false); // Fade in the new image
    }, 4000); // Wait for 1 second for fade-out to complete before changing the image

    return () => {
      clearTimeout(timer);
      clearTimeout(imageChangeTimer);
    };
  }, []);

  const handleButtonClick = () => {
    navigate('/OpeningScene2'); 
  };

  return (
    <div className='image-button-container'>
      <img
        src={currentImage}
        alt="Scene"
        className={isFading ? 'fade-out' : 'fade-in'} // Apply the appropriate class based on fading state
      />
      <button onClick={handleButtonClick}>Go to Other Screen</button>
    </div>
  );
};

export default OpeningScene1;
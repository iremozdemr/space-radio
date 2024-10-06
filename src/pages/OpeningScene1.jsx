import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/OpeningScene1.css';

const OpeningScene1 = () => {
  const [currentImage, setCurrentImage] = useState('./scene1.png'); // Initial image
  const [isFading, setIsFading] = useState(false); // Track fading state
  const [currentStep, setCurrentStep] = useState(1); // Track the current step (1: Scene1, 2: Scene2, etc.)
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFading(true); // Start fading out
    }, 3000); // Wait for 3 seconds before fading out the current image

    const imageChangeTimer = setTimeout(() => {
      switch (currentStep) {
        case 1:
          setCurrentImage('./scene2.png'); // Change to the second image
          setCurrentStep(2); // Move to the next step
          break;
        case 2:
          setCurrentImage('./scene3.png'); // Change to the third image
          setCurrentStep(3); // Move to the next step
          break;
        case 3:
          setCurrentImage('./scene4.png'); // Change to the fourth image
          setCurrentStep(4); // Move to the next step
          break;
        case 4:
          setCurrentImage('./scene5.png'); // Change to the fifth image
          setCurrentStep(5); // Move to the next step
          break;
        case 5:
          setCurrentImage('./scene6.png'); // Change to the sixth image
          setCurrentStep(6); // Move to the next step
          break;
        default:
          navigate('/OpeningScene2'); // Automatically navigate after all scenes
      }
      setIsFading(false); // Fade in the new image
    }, 4000); // Wait for 1 second for fade-out to complete before changing the image

    return () => {
      clearTimeout(timer);
      clearTimeout(imageChangeTimer);
    };
  }, [currentStep, navigate]);

  // const handleButtonClick = () => {
  //   navigate('/OpeningScene2'); 
  // };

  return (
    <div className='image-button-container'>
      <img
        src={currentImage}
        alt="Scene"
        className={isFading ? 'fade-out' : 'fade-in'} // Apply the appropriate class based on fading state
      />
      <div className='scene-text-div'>
        <p>The Diary of an Astrophysicist, a Student of Charles Boyle</p>
      </div>
      {/* <button onClick={handleButtonClick}>Go to Other Screen</button> */}
    </div>
  );
};

export default OpeningScene1;
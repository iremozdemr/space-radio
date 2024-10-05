// HelloWorld.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; 

const OpeningScene1 = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/OpeningScene2'); // Butona basıldığında ana sayfa olan '/' rotasına yönlendiriyoruz
  };

  return (
    <div>
      <p>opening scene 1 page</p>
      <button onClick={handleButtonClick}>Go to Other Screen</button> {/* Butona basıldığında ana sayfa açılacak */}
    </div>
  );
};

export default OpeningScene1;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainPageButton from '../components/MainPageButton';
import '../css/PlanetViewer.css'; 

const OpeningScene2 = () => {
  const navigate = useNavigate();

  const handleLandOnPlanet = () => {
    console.log("Animasyon tamamlandı, yönlendiriliyor");
      navigate('/PlanetViewer', { state: { planet: "earth" } });
  };

  return (
    <>
      <div>
        <p>solar system page</p>
      </div>
  
      <div className="button-bottom">
        <MainPageButton onClick={handleLandOnPlanet} className="large-button">
          Gezegeni goruntule!!!
        </MainPageButton>
      </div>

      <div className="space">
      </div>
    </>
  );
};

export default OpeningScene2;
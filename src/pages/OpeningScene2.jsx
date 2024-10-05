import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainPageButton from '../components/MainPageButton';
import Scene from '../components/Scene';
import { sendAnimate } from '../components/js/portal/portal';
import '../css/PlanetViewer.css'; 

const OpeningScene2 = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  const handleLandOnPlanet = () => {
    console.log("Animasyon başlatılıyor");
    setIsAnimating(true);
    sendAnimate(() => {
      console.log("Animasyon tamamlandı, yönlendiriliyor");
      navigate('/SolarSystemPage', { state: { planet: "earth" } });
      setIsAnimating(false);
    });
  };

  return (
    <>
      <div>
        <p>opening scene 2 page</p>
      </div>
  
      <div className="button-bottom">
        <MainPageButton onClick={handleLandOnPlanet} className="large-button">
          Isinlan!!!
        </MainPageButton>
      </div>

      {isAnimating && (
        <div className="animation-overlay">
          <Scene />
        </div>
      )}

      <div className="space">
      </div>
    </>
  );
};

export default OpeningScene2;
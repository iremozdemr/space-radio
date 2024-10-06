import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Scene from '../components/Scene';
import { sendAnimate } from '../components/js/portal/portal';
import '../css/PlanetViewer.css'; 

const OpeningScene2 = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const startAnimation = () => {
      console.log("Animasyon başlatılıyor");
      setIsAnimating(true);
      sendAnimate(() => {
        console.log("Animasyon tamamlandı, yönlendiriliyor");
        navigate('/SolarSystemPage', { state: { planet: "earth" } });
        setIsAnimating(false);
      });
    };

    startAnimation(); // Sayfa yüklendiğinde animasyonu başlat
  }, [navigate]); // Bu sadece navigate değiştiğinde tekrar tetiklenir

  return (
    <>
      <div>
        <p>opening scene 2 page</p>
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

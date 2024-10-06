// src/pages/SolarSystemPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DataPanel from '../components/SolarSystemComponents/DataPanel';
import Controls from '../components/SolarSystemComponents/Controls';
import Universe from '../components/SolarSystemComponents/Universe';
import MainPageButton from '../components/MainPageButton';
import '../css/PlanetViewer.css';
import '../css/SolarSystemPageCss/animation.css';
import '../css/SolarSystemPageCss/basics.css';
import '../css/SolarSystemPageCss/infos.css';
import '../css/SolarSystemPageCss/legends.css';
import '../css/SolarSystemPageCss/lighting.css';
import '../css/SolarSystemPageCss/orbits.css';
import '../css/SolarSystemPageCss/responsive.css';
import '../css/SolarSystemPageCss/sizes.css';
import '../css/SolarSystemPageCss/transitions.css';
import '../css/SolarSystemPageCss/ui.css';
import '../css/SolarSystemPageCss/views.css';

const SolarSystemPage = () => {
  const navigate = useNavigate();
  const [view3D, setView3D] = useState(true);
  const [zoomLarge, setZoomLarge] = useState(true);
  const [scale, setScale] = useState('speed');
  const [controlsOpen, setControlsOpen] = useState(false);
  const [activePlanet, setActivePlanet] = useState('earth');

  useEffect(() => {
    const container = document.getElementById('app-container');
    container.classList.remove('view-2D', 'opening');
    container.classList.add('view-3D');

    const timer = setTimeout(() => {
      container.classList.remove('hide-UI');
      container.classList.add('set-speed');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // toggleData ve dataOpen kaldırıldı

  const toggleControls = (e) => {
    e.preventDefault();
    setControlsOpen((prev) => !prev);
  };

  const handleSelectPlanet = (planet) => {
    setActivePlanet(planet);
  };

  const handleToggleView = () => {
    setView3D((prev) => !prev);
  };

  const handleToggleZoom = () => {
    setZoomLarge((prev) => !prev);
  };

  const handleSetScale = (newScale) => {
    setScale(newScale);
  };

  useEffect(() => {
    const container = document.getElementById('app-container');
    // dataOpen ile ilgili sınıflar kaldırıldı
    if (controlsOpen) {
      container.classList.add('controls-open');
      container.classList.remove('controls-close');
    } else {
      container.classList.add('controls-close');
      container.classList.remove('controls-open');
    }
  }, [controlsOpen]);

  useEffect(() => {
    const container = document.getElementById('app-container');
    if (view3D) {
      container.classList.add('view-3D');
      container.classList.remove('view-2D');
    } else {
      container.classList.add('view-2D');
      container.classList.remove('view-3D');
    }

    if (zoomLarge) {
      container.classList.add('zoom-large');
      container.classList.remove('zoom-close');
    } else {
      container.classList.add('zoom-close');
      container.classList.remove('zoom-large');
    }
  }, [view3D, zoomLarge]);

  useEffect(() => {
    const universe = document.getElementById('universe');
    if (universe) {
      universe.classList.remove('scale-stretched', 'scale-s', 'scale-d', 'set-speed', 'set-size', 'set-distance');

      if (scale === 'speed') {
        universe.classList.add('scale-stretched', 'set-speed');
      } else if (scale === 'size') {
        universe.classList.add('scale-s', 'set-size');
      } else if (scale === 'distance') {
        universe.classList.add('scale-d', 'set-distance');
      }
    }
  }, [scale]);

  const handleLandOnPlanet = () => {
    console.log("Animasyon tamamlandı, yönlendiriliyor");
    navigate('/PlanetViewer', { state: { planet: "earth" } });
  };

  return (
    <>
      <div id="app-container" className="opening hide-UI view-2D zoom-large controls-close">
        <Controls
          view3D={view3D}
          zoomLarge={zoomLarge}
          scale={scale}
          onToggleView={handleToggleView}
          onToggleZoom={handleToggleZoom}
          onSetScale={handleSetScale}
        />
        <Universe activePlanet={activePlanet} />
      </div>

      {/* DataPanel'i sayfanın altına yerleştirin */}
      <div className="data-panel-bottom">
        <DataPanel activePlanet={activePlanet} onSelectPlanet={handleSelectPlanet} />
      </div>

      <div className="button-bottom">
        <MainPageButton onClick={handleLandOnPlanet} className="large-button">
          Gezegeni Görüntüle!!!
        </MainPageButton>
      </div>

      <div className="space"></div>
    </>
  );
};

export default SolarSystemPage;

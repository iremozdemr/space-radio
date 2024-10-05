import { useState, useRef, useEffect } from 'react';
import StarsCanvas from '../components/StarsCanvas'; 
import TodoList from '../components/TodoList';
import SpotifyIframe from '../components/SpotifyIframe';
import ModelViewer from '../components/ModelViewers'; 
import SpaceShip from '../components/SpaceShip';
import { useLocation, useNavigate } from 'react-router-dom'; // useNavigate eklendi
import '../css/SpacePage.css'; 

const SpacePage = () => {
  const location = useLocation(); 
  const navigate = useNavigate(); // Sayfa yönlendirme için kullanılır
  const planet = location.state?.planet || 'earth'; 

  const [position, setPosition] = useState({ top: 100, left: 100 });
  const [todoSize, setTodoSize] = useState({ width: 300, height: 300 });
  const [spotifyPosition, setSpotifyPosition] = useState({ top: 300, left: 100 });
  const [spotifySize, setSpotifySize] = useState({ width: 300, height: 380 });
  const isResizing = useRef({ right: false, left: false, top: false, bottom: false });

  // Yeni state: Arka plan ve bileşenleri kontrol etmek için
  const [isInSpaceShip, setIsInSpaceShip] = useState(false);

  // Sayaç: Zamanı tutan state
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    let animationFrameId;

    const updateTime = () => {
      setTimeElapsed((prev) => prev + 100);
      animationFrameId = setTimeout(updateTime, 100); // Her 100ms'de sayaç artar
    };

    updateTime();

    return () => {
      clearTimeout(animationFrameId); // Temizlik işlevi
    };
  }, []);

  const startResize = (e, direction) => {
    e.preventDefault();
    isResizing.current[direction] = true;
  };

  const handleMouseMove = (e) => {
    if (isResizing.current.right) {
      setTodoSize(prev => ({ ...prev, width: e.clientX - e.target.getBoundingClientRect().left }));
    }
    if (isResizing.current.left) {
      const deltaX = e.target.getBoundingClientRect().left - e.clientX;
      setTodoSize(prev => ({ ...prev, width: prev.width + deltaX }));
      setPosition(prev => ({ ...prev, left: prev.left - deltaX }));
    }
    if (isResizing.current.bottom) {
      setTodoSize(prev => ({ ...prev, height: e.clientY - e.target.getBoundingClientRect().top }));
    }
    if (isResizing.current.top) {
      const deltaY = e.target.getBoundingClientRect().top - e.clientY;
      setTodoSize(prev => ({ ...prev, height: prev.height + deltaY }));
      setPosition(prev => ({ ...prev, top: prev.top - deltaY }));
    }
  };

  const stopResize = () => {
    isResizing.current = { right: false, left: false, top: false, bottom: false };
  };

  // Butona tıklama işlevi
  const handleToggleBackground = () => {
    setIsInSpaceShip(prevMode => !prevMode);
  };

  return (
    <div 
      className={`space-page ${isInSpaceShip ? 'inSpaceShip-background' : 'star-background'}`} 
      onMouseMove={handleMouseMove} 
      onMouseUp={stopResize}
    >
      {!isInSpaceShip && <StarsCanvas />}

      {/* Spaceship her iki modda da çalışmaya devam eder, ancak sadece "star-background" modunda gösterilir */}
      <SpaceShip 
        duration={100000} 
        timeElapsed={timeElapsed} 
        isVisible={!isInSpaceShip} 
        onComplete={() => navigate('/planet')} // Gemi gezegene ulaştığında PlanetPage'e yönlendirme
      />

      {isInSpaceShip && (
        <>
          <TodoList
            position={position}
            setPosition={setPosition}
            size={todoSize}
            setSize={setTodoSize}
            onResize={startResize}
            stopResize={stopResize}
          />

          <SpotifyIframe
            position={spotifyPosition}
            setPosition={setSpotifyPosition}
            size={spotifySize}
            setSize={setSpotifySize}
          />
        </>
      )}

      {!isInSpaceShip && (
        <div className="planet-viewer-container">
          <ModelViewer planet={`./models/${planet}.glb`} />
        </div>
      )}

      {/* Sayaç iki modda da gösterilir */}
      <div className="timer-display">Time Elapsed: {Math.floor(timeElapsed / 1000)}s</div>

      <button className="toggle-background-btn" onClick={handleToggleBackground}>
        {isInSpaceShip ? 'Show Stars' : 'Show Planet'}
      </button>
    </div>
  );
};

export default SpacePage;

// import React, { useEffect, useState } from 'react';

// const Spaceship = ({ duration, timeElapsed, isVisible, onComplete }) => {
//   const [position, setPosition] = useState({ left: 0 });

//   useEffect(() => {
//     const distance = window.innerWidth - 300; // Gezegenin sağ tarafta olduğu konum
//     const progress = Math.min(timeElapsed / duration, 1); // Animasyonun ilerleme yüzdesi
//     const newLeft = progress * distance; // Gemi konumunu hesapla
//     setPosition({ left: newLeft });

//     if (progress === 1) {
//       onComplete(); // Gemi gezegene ulaştığında çağrılır
//     }
//   }, [timeElapsed, duration, onComplete]);

//   return (
//     <div
//       style={{
//         width: "500",
//         height: '500',
//         zIndex: 1000,
//         position: 'absolute',
//         top: '50%',
//         left: `${position.left}px`,
//         transform: 'translateY(-50%)',
//         visibility: isVisible ? 'visible' : 'hidden', // Gemiyi görünür veya gizli yap
//       }}
//     >
//       <img src={'spaceship.jpeg'} alt="Spaceship" style={{ width: '100px', height: '100px' }} />
//     </div>
//   );
// };

// export default Spaceship;

import React, { useEffect, useState } from 'react';

const Spaceship = ({ duration, timeElapsed, isVisible, onComplete }) => {
  const [position, setPosition] = useState({ left: 0 });

  useEffect(() => {
    const distance = window.innerWidth - 300; 
    const progress = Math.min(timeElapsed / duration, 1); 
    const newLeft = progress * distance; 
    setPosition({ left: newLeft });

    if (progress === 1) {
      onComplete(); 
    }
  }, [timeElapsed, duration, onComplete]);

  return (
    <div
      style={{
        zIndex: 1000,
        position: 'absolute',
        // top: '50%',
        left: `${position.left}px`,
        transform: 'rotate(90deg)',
        // transform: 'translateY(-50%)',
        visibility: isVisible ? 'visible' : 'hidden',
      }}
    >
      <model-viewer
        src="./models/rocket.glb"
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        tone-mapping="neutral"
        poster="poster.webp"
        shadow-intensity="0"
        style={{ width: '300px', height: '300px' }}
      >
        <div className="progress-bar hide" slot="progress-bar">
          <div className="update-bar"></div>
        </div>
        <button slot="ar-button" id="ar-button">
          View in your space
        </button>
        <div id="ar-prompt">

        </div>
      </model-viewer>
    </div>
  );
};

export default Spaceship;
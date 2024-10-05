import React, { useRef } from 'react';
import '../css/SpotifyIframe.css'; // CSS dosyasını dahil ediyoruz

const SpotifyIframe = ({ position, setPosition, size }) => {
  const containerRef = useRef(null);

  const handleMouseDown = (e) => {
    e.preventDefault(); // Tarayıcı varsayılan olaylarını engelle
    const startX = e.clientX;
    const startY = e.clientY;
    const initialLeft = position.left;
    const initialTop = position.top;

    const handleMouseMove = (moveEvent) => {
      const newLeft = initialLeft + (moveEvent.clientX - startX);
      const newTop = initialTop + (moveEvent.clientY - startY);
      setPosition({ top: newTop, left: newLeft });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      className="spotify-wrapper"
      ref={containerRef}
      onMouseDown={handleMouseDown} // Sürükleme işlemi için olay ekleniyor
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        position: 'absolute',
        cursor: 'move', // Tüm alan için sürükleme göstergesi
      }}
    >
      <iframe
        id="spotify"
        src="https://open.spotify.com/embed/playlist/2EIqlPcVMRx0MXU96szswx?utm_source=generator"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Spotify Playlist"
        style={{
          width: '100%',
          height: '100%',
          pointerEvents: 'auto', // Spotify iframe tıklanabilir
        }}
      />
    </div>
  );
};

export default SpotifyIframe;

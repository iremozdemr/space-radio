import React from 'react';
import '../css/ModelViewers.css'; 

const ModelViewer = ({ planet }) => {
  return (
    <model-viewer
      src={planet}
      ar
      ar-modes="webxr scene-viewer quick-look"
      camera-controls
      tone-mapping="commerce"
      // poster="poster.webp"
      poster={`${planet}-poster.webp`}
      shadow-intensity="0"
      auto-rotate
      disable-tap
    >
      <div className="progress-bar hide" slot="progress-bar">
        <div className="update-bar"></div>
      </div>
      <button slot="ar-button"></button>
    </model-viewer>
  );
};

export default ModelViewer;
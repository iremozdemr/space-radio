// src/components/Controls.jsx
import React from 'react';

function Controls({
  view3D,
  zoomLarge,
  scale,
  onToggleView,
  onToggleZoom,
  onSetScale,
}) {
  return (
    <div id="controls">
      <label className="set-view">
        <input
          type="checkbox"
          checked={view3D}
          onChange={onToggleView}
        />
        <span>3D View</span>
      </label>
      <label className="set-zoom">
        <input
          type="checkbox"
          checked={zoomLarge}
          onChange={onToggleZoom}
        />
        <span>Zoom</span>
      </label>
      <div className="scale-options">
        <label>
          <input
            type="radio"
            className="set-speed"
            name="scale"
            checked={scale === 'speed'}
            onChange={() => onSetScale('speed')}
          />
          <span>Speed</span>
        </label>
        <label>
          <input
            type="radio"
            className="set-size"
            name="scale"
            checked={scale === 'size'}
            onChange={() => onSetScale('size')}
          />
          <span>Size</span>
        </label>
        <label>
          <input
            type="radio"
            className="set-distance"
            name="scale"
            checked={scale === 'distance'}
            onChange={() => onSetScale('distance')}
          />
          <span>Distance</span>
        </label>
      </div>
    </div>
  );
}

export default Controls;

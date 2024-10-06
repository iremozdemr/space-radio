// src/components/Navbar.jsx
import React from 'react';

function Navbar({ onToggleData, onToggleControls }) {
  return (
    <div id="navbar">
   
      <a id="toggle-controls" href="#controls" onClick={onToggleControls}>
        <i className="icon-controls"></i>Controls
      </a>
    </div>
  );
}

export default Navbar;

// src/components/PlanetOrbit.jsx
import React from 'react';

const PlanetOrbit = ({ id, name, hasMoon, hasRing }) => {
  return (
    <div id={id} className={`orbit ${hasRing ? 'ring' : ''}`}>
      <div className="pos">
        <div className="planet">
          <img src={`/images/p-${id}.png`} alt={name} />
          {/* {hasMoon && (
            <img src="/images/moon.png" alt="Moon" className="moon" />
          )} */}
        </div>
      </div>
    </div>
  );
};

export default PlanetOrbit;

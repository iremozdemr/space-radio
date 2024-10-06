// src/components/Universe.jsx
import React from 'react';
import Sun from './Sun'; // Sun bileşenini içe aktarın
import PlanetOrbit from './PlanetOrbit'; // PlanetOrbit bileşenini içe aktarın

function Universe({ activePlanet }) {
  const planets = [
    { id: 'mercury', name: 'Mercury' },
    { id: 'venus', name: 'Venus' },
    { id: 'earth', name: 'Earth', hasMoon: true },
    { id: 'mars', name: 'Mars' },
    { id: 'jupiter', name: 'Jupiter' },
    { id: 'saturn', name: 'Saturn', hasRing: true },
    { id: 'uranus', name: 'Uranus' },
    { id: 'neptune', name: 'Neptune' },
  ];

  return (
    <div id="universe" className="scale-stretched">
      <div id="galaxy">
        <div id="solar-system" className={activePlanet}>
          <Sun />
          {planets.map((planet) => (
            <PlanetOrbit
              key={planet.id}
              id={planet.id}
              name={planet.name}
              hasMoon={planet.hasMoon}
              hasRing={planet.hasRing}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Universe;

// Scene.jsx
import React, { useEffect, useRef } from 'react';
import { ThreeApp } from './js/ThreeApp';
import { createPotal } from './js/portal/portal'; 
import * as THREE from 'three';

const Scene = () => {
  const webglRef = useRef(null);
  let threeApp = null;

  useEffect(() => {
    console.log("Three.js sahnesi başlatılıyor");

    // ThreeApp sahnesini başlat
    threeApp = new ThreeApp(webglRef.current);
    threeApp.render();
    createPotal(threeApp); // Portalı oluştur

    // Basit bir küp ekleyerek sahnenin çalışıp çalışmadığını kontrol edin
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    threeApp.scene.add(cube);
    console.log("Küp ekleniyor");

    // Bileşen DOM'dan kaldırılmadan önce temizle
    return () => {
      console.log("ThreeApp temizleniyor");
      threeApp.clear();
    };
  }, []);

  return (
    <canvas ref={webglRef} className="webgl" style={{ backgroundColor: 'black' }}></canvas>
  );
};

export default Scene;

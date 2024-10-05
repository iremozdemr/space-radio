import React from 'react';
import '../css/LeftRightButton.css'; 

const LeftRightButton = ({ onClick, children, className, imgSrc, imgAlt }) => {
  return (
    <button className={`${className}`} onClick={onClick}>
      {imgSrc ? <img src={imgSrc} alt={imgAlt} /> : children}
    </button>
  );
};

export default LeftRightButton;
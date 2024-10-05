// MainPageButton.jsx
import React from 'react';
import '../css/MainPageButton.css'; 

const MainPageButton = ({ onClick, children, className }) => {
  return (
    <button className={`main-page-button ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default MainPageButton;
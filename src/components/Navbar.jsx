import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const handleCloseNavbar = () => {
    setShowNavbar(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="container">
          <div className="logo">
            <img src={'logo.png'} alt="Brand Logo" />
          </div>
          <div className="menu-icon" onClick={handleShowNavbar}>
            <div className={`hamburger ${showNavbar ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div className={`nav-elements ${showNavbar ? 'active' : ''}`}>
            <ul>
              <li><NavLink to="/" onClick={handleCloseNavbar}>Home</NavLink></li>
              {/* <li><NavLink to="/blog" onClick={handleCloseNavbar}>Blog</NavLink></li>
              <li><NavLink to="/projects" onClick={handleCloseNavbar}>Projects</NavLink></li> */}
              <li><NavLink to="/about" onClick={handleCloseNavbar}>About</NavLink></li>
              <li><NavLink to="/contact" onClick={handleCloseNavbar}>Contact</NavLink></li>
              <li><NavLink to="/login" onClick={handleCloseNavbar} className="login-btn">Login</NavLink></li> {/* Giriş Yap butonu */}
            </ul>
          </div>
        </div>
      </nav>
      <div className={`overlay ${showNavbar ? 'active' : ''}`} onClick={handleCloseNavbar}></div>
    </>
  );
};

export default Navbar;
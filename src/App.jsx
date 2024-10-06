import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import StarsCanvas from './components/StarsCanvas';
import PlanetViewer from './components/PlanetViewer';  
import PlanetPage from './pages/PlanetPage'; 
import AuthPage from './pages/AuthPage'; 
import OpeningScene1 from './pages/OpeningScene1';
import OpeningScene2 from './pages/OpeningScene2';
import SolarSystemPage from './pages/SolarSystemPage';

const AppLayout = () => {
  const location = useLocation(); 

  return (
    <div className="app-layout">
      {location.pathname !== '/space' && <Navbar className="navbar-visible" />}
      
      <main className={`main-content ${location.pathname === '/space' ? 'full-screen' : ''}`}>
        <StarsCanvas />
        <Routes>
          <Route path="/" element={<OpeningScene1 />} />
          <Route path="/OpeningScene2" element={<OpeningScene2 />} />
          <Route path="/SolarSystemPage" element={<SolarSystemPage />} /> 
          <Route path="/PlanetViewer" element={<PlanetViewer />} />
          <Route path="/planet" element={<PlanetPage />} /> 
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<AuthPage />} />
        </Routes>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
};

const About = () => <div>About</div>;
const Contact = () => <div>Contact</div>;

export default App;

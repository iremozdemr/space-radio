// PlanetViewer.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModelViewer from './ModelViewers';
import MainPageButton from './MainPageButton';
import TodoList from './TodoList';
import '../css/PlanetViewer.css';
import LeftRightButton from './LeftRightButton';
import rightIcon from "../../public/rightIcon.png";
import leftIcon from "../../public/leftIcon.png";
import Calendar from './Calendar';

const planetModels = {
  earth: '/models/earth.glb',
  jupiter: '/models/jupiter.glb',
  mars: '/models/mars.glb',
  mercury: '/models/mercury.glb',
  neptune: '/models/neptune.glb',
  pluto: '/models/pluto.glb',
  saturn: '/models/saturn.glb',
  uranus: '/models/uranus.glb',
  venus: '/models/venus.glb',
};

const planetInfo = {
  earth: {
    description: "Earth — our home planet is the only place we know of so far that's inhabited by living things. It's also the only planet in our solar system with liquid water on the surface.",
    yearLength: "365.25",
    distanceFromSun: "1 AU",
    moons: "1",
  },
  jupiter: {
    description: "Jupiter is more than twice as massive than the other planets of our solar system combined. The giant planet's Great Red spot is a centuries-old storm bigger than Earth.",
    yearLength: "11.86",
    distanceFromSun: "5.2 AU",
    moons: "79",
  },
  mars: {
    description: "Mars is a dusty, cold, desert world with a very thin atmosphere. There is strong evidence Mars was—billions of years ago—wetter and warmer, with a thicker atmosphere.",
    yearLength: "1.88 days",
    distanceFromSun: "1.5 AU",
    moons: "2",
  },
  mercury: {
    description: "Mars is often called the Red Planet due to its reddish appearance. It has the tallest volcano and the deepest canyon in the solar system.",
    yearLength: "687 days",
    distanceFromSun: "1.5 AU",
    moons: "2",
  },
  neptune: {
    description: "Mars is often called the Red Planet due to its reddish appearance. It has the tallest volcano and the deepest canyon in the solar system.",
    yearLength: "687 days",
    distanceFromSun: "1.5 AU",
    moons: "2",
  },
  pluto: {
    description: "Mars is often called the Red Planet due to its reddish appearance. It has the tallest volcano and the deepest canyon in the solar system.",
    yearLength: "687 days",
    distanceFromSun: "1.5 AU",
    moons: "2",
  },
  saturn: {
    description: "Mars is often called the Red Planet due to its reddish appearance. It has the tallest volcano and the deepest canyon in the solar system.",
    yearLength: "687 days",
    distanceFromSun: "1.5 AU",
    moons: "2",
  },
  uranus: {
    description: "Mars is often called the Red Planet due to its reddish appearance. It has the tallest volcano and the deepest canyon in the solar system.",
    yearLength: "687 days",
    distanceFromSun: "1.5 AU",
    moons: "2",
  },
  venus: {
    description: "Mars is often called the Red Planet due to its reddish appearance. It has the tallest volcano and the deepest canyon in the solar system.",
    yearLength: "687 days",
    distanceFromSun: "1.5 AU",
    moons: "2",
  }
  // Add similar info for other planets...
};

const PlanetViewer = () => {
  const [currentPlanet, setCurrentPlanet] = useState('earth');
  const navigate = useNavigate();

  // const handleNextPlanet = () => {
  //   const planetNames = Object.keys(planetModels);
  //   const currentIndex = planetNames.indexOf(currentPlanet);
  //   const nextIndex = (currentIndex + 1) % planetNames.length;
  //   setCurrentPlanet(planetNames[nextIndex]);
  // };

  // const handlePrevPlanet = () => {
  //   const planetNames = Object.keys(planetModels);
  //   const currentIndex = planetNames.indexOf(currentPlanet);
  //   const prevIndex = (currentIndex - 1 + planetNames.length) % planetNames.length;
  //   setCurrentPlanet(planetNames[prevIndex]);
  // };

  const handleNextPlanet = () => {
    const planetNames = Object.keys(planetModels);
    const currentIndex = planetNames.indexOf(currentPlanet);
    const nextIndex = (currentIndex + 1) % planetNames.length;
    setCurrentPlanet(planetNames[nextIndex]);
  };

  const handlePrevPlanet = () => {
    const planetNames = Object.keys(planetModels);
    const currentIndex = planetNames.indexOf(currentPlanet);
    const prevIndex = (currentIndex - 1 + planetNames.length) % planetNames.length;
    setCurrentPlanet(planetNames[prevIndex]);
  };

  const { description, yearLength, distanceFromSun, moons } = planetInfo[currentPlanet];

  const handleLandOnPlanet = () => {
    navigate('/planet', { state: { planet: currentPlanet } });
  };

  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const completedTasksCount = tasks.filter(task => task.completed).length;

  // Yeni görev ekleme işlevi
  const addTask = () => {
    if (taskInput.trim() !== '') {
      const newTask = {
        id: Date.now(),
        text: taskInput,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setTaskInput('');
    }
  };

  // Görev kaldırma işlevi
  const removeTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Görevi tamamlanmış olarak işaretleme işlevi
  const toggleTask = (taskId) => {
    setTasks(
      tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <>
      <div className='div-flexbox' id='first-column'>

      <div className="todo-container">
        <div className="info">
          {description}
        </div>

        <div className="metrics">
            <div className="metric-item">
                <div className="data">{yearLength}</div>
                <div className="metric-label small-text">DAYS</div>
                <div className="small-text">Length of Year</div>
            </div>

            <div className="metric-item">
                <div className="data">{distanceFromSun}</div>
                <div className="metric-label small-text">AU</div>
                <div className="small-text">Distance From Sun</div>
            </div>

            <div className="metric-item">
                <div className="data">{moons}</div>
                <div className="metric-label small-text">Moons</div>
            </div>
        </div>
      </div>

      <div className="planet-name">
        <h1 className='exo-2-bold-text1'>Earth</h1>
      </div>

      <div className='div-spotify'>
      <iframe
        id="spotify"
        src="https://open.spotify.com/embed/playlist/2EIqlPcVMRx0MXU96szswx?utm_source=generator"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Spotify Playlist"
        style={{
          width: '100%',
          height: '350px',
          pointerEvents: 'auto', // Spotify iframe tıklanabilir
        }}
      />
      </div>

      </div>

      <div className="planet-viewer-wrapper">

        {/* Previous Button - Sol */}
        <div className="aaa">
          <LeftRightButton
            onClick={handlePrevPlanet}
            className="aaa"
            imgSrc={"leftIcon.png"}  // Sol buton için leftIcon.png kullanıyoruz
            imgAlt="Previous"
          />
        </div>

        {/* Model Viewer */}
        <div className="model-viewer-container">
          <ModelViewer planet={planetModels[currentPlanet]} />
        </div>

        {/* Next Button - Sağ */}
        <div className="aaa">
          <LeftRightButton
            onClick={handleNextPlanet}
            className="aaa"
            imgSrc={rightIcon}  // Sağ buton için rightIcon.png kullanıyoruz
            imgAlt="Next"
          />
        </div>
      </div>

      {/* Land on the Planet Button
      <div className="button-bottom">
        <MainPageButton onClick={handleLandOnPlanet} className="large-button">
          Land on the Planet
        </MainPageButton>
      </div> */}

      <div className='div-flexbox' id='second-column'>
      <div className="todo-container">
        <Calendar></Calendar>
      </div>

      <div className="todo-container">
        <h2>
          completed tasks: <span id="completed-count">{completedTasksCount}</span> /{' '}
          <span id="total-count">{tasks.length}</span>
        </h2>
        <ul id="task-list">
          {tasks.map((task) => (
            <li key={task.id} className={task.completed ? 'completed' : ''}>
              <input
                type="checkbox"
                className="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <span className="task-text">{task.text}</span>
              <span className="delete" onClick={() => removeTask(task.id)}>
                &#x2716;
              </span>
            </li>
          ))}
        </ul>
        <div className="input-group">
          <input
            type="text"
            id="new-task"
            placeholder="+ add new task"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()} // Enter tuşuna basıldığında tetikleniyor
          />
        </div>
      </div>
      
      </div>

      {/* Animasyonun uygulanacağı alan */}
      <div className="space">
      </div>
    </>
  );
};

export default PlanetViewer;
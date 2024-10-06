// PlanetPage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../css/PlanetPage.css';

const PlanetPage = () => {
  const location = useLocation();
  const { planet } = location.state || { planet: 'earth' }; // Gezegen bilgisini alıyoruz
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const completedTasksCount = tasks.filter(task => task.completed).length;

  console.log('PlanetPage component rendered'); // Bileşenin render edildiğini logluyoruz


  useEffect(() => {
    console.log(`Planet Page loaded for planet: ${planet}`); // Gezegenin doğru aktarılıp aktarılmadığını kontrol edelim
  }, [planet]);


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
    <div className="planet-page">
      <div className="todo-container">
        <h2>
          Completed Items: <span id="completed-count">{completedTasksCount}</span> /{' '}
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
            placeholder="+ Add new task"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()} // Enter tuşuna basıldığında tetikleniyor
          />
        </div>
      </div>

      <iframe
        id="spotify"
        src="https://open.spotify.com/embed/playlist/2EIqlPcVMRx0MXU96szswx?utm_source=generator"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Spotify Playlist"
      />
    </div>
  );
};

export default PlanetPage;
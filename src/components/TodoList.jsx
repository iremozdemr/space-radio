import { useState } from 'react';
import '../css/TodoList.css'; // CSS dosyasını dahil ediyoruz

const TodoList = ({ position, setPosition }) => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

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

  const removeTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleTask = (taskId) => {
    setTasks(
      tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div
      className="todo-container resizable"
      draggable="true"
      onDragEnd={(e) => {
        const newTop = e.clientY - e.target.offsetHeight / 2;
        const newLeft = e.clientX - e.target.offsetWidth / 2;
        setPosition({ top: newTop, left: newLeft });
      }}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      <h2>
        completed tasks: <span id="completed-count">{tasks.filter(task => task.completed).length}</span> /{' '}
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
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
      </div>
    </div>
  );
};

export default TodoList;
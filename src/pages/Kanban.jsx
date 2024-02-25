import  { useState } from 'react';

const Kanban = () => {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    const newTask = {
      id: tasks.length + 1,
      title: 'New Task',
      status: 'To Do',
    };

    setTasks([...tasks, newTask]);
  };

  const handleMoveTask = (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <div>
      <h1>Kanban Board</h1>

      <button onClick={handleAddTask}>Add Task</button>

      <div>
        <h2>To Do</h2>
        {tasks
          .filter((task) => task.status === 'To Do')
          .map((task) => (
            <div key={task.id}>
              <span>{task.title}</span>
              <button onClick={() => handleMoveTask(task.id, 'In Progress')}>
                Move to In Progress
              </button>
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </div>
          ))}
      </div>

      <div>
        <h2>In Progress</h2>
        {tasks
          .filter((task) => task.status === 'In Progress')
          .map((task) => (
            <div key={task.id}>
              <span>{task.title}</span>
              <button onClick={() => handleMoveTask(task.id, 'Done')}>
                Move to Done
              </button>
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </div>
          ))}
      </div>

      <div>
        <h2>Done</h2>
        {tasks
          .filter((task) => task.status === 'Done')
          .map((task) => (
            <div key={task.id}>
              <span>{task.title}</span>
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Kanban;

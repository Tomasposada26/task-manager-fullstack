import React, { useEffect, useState } from 'react';
import { fetchTasks, Task } from '../services/taskService';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');

  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchTasks(status, priority);
        setTasks(data);
      } catch (err: any) {
        setError(err.message || 'Error loading tasks');
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, [status, priority]);

  return (
    <div>
      <h2>My Tasks</h2>
      <div style={{ marginBottom: 16 }}>
        <label>
          Status:
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </label>
        <label style={{ marginLeft: 16 }}>
          Priority:
          <select value={priority} onChange={e => setPriority(e.target.value)}>
            <option value="">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <strong>{task.title}</strong> - {task.status} - {task.priority}
            {task.dueDate && <> | Due: {new Date(task.dueDate).toLocaleDateString()}</>}
          </li>
        ))}
      </ul>
      {(!loading && tasks.length === 0) && <div>No tasks found.</div>}
    </div>
  );
};

export default TaskList;

import React, { useEffect, useState } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask, Task } from '../services/taskService';

const initialForm: Partial<Task> = {
  title: '',
  description: '',
  status: 'pending',
  priority: 'medium',
  dueDate: '',
};

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [form, setForm] = useState<Partial<Task>>(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

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

  useEffect(() => {
    loadTasks();
    // eslint-disable-next-line
  }, [status, priority]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!form.title || form.title.length < 3) {
      setFormError('Title is required and must be at least 3 characters.');
      return;
    }
    try {
      if (editingId) {
        await updateTask(editingId, form);
      } else {
        await createTask(form);
      }
      setForm(initialForm);
      setEditingId(null);
      loadTasks();
    } catch (err: any) {
      setFormError(err.message || 'Error saving task');
    }
  };

  const handleEdit = (task: Task) => {
    setForm({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate ? task.dueDate.slice(0, 10) : '',
    });
    setEditingId(task._id);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await deleteTask(id);
      loadTasks();
    } catch (err: any) {
      setError(err.message || 'Error deleting task');
    }
  };

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
      <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
        <input
          name="title"
          placeholder="Title"
          value={form.title || ''}
          onChange={handleChange}
          required
        />
        <input
          name="description"
          placeholder="Description"
          value={form.description || ''}
          onChange={handleChange}
        />
        <select name="status" value={form.status || 'pending'} onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <select name="priority" value={form.priority || 'medium'} onChange={handleChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          name="dueDate"
          type="date"
          value={form.dueDate || ''}
          onChange={handleChange}
        />
        <button type="submit">{editingId ? 'Update' : 'Add'} Task</button>
        {editingId && <button type="button" onClick={() => { setForm(initialForm); setEditingId(null); }}>Cancel</button>}
        {formError && <span style={{ color: 'red', marginLeft: 8 }}>{formError}</span>}
      </form>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <strong>{task.title}</strong> - {task.status} - {task.priority}
            {task.dueDate && <> | Due: {new Date(task.dueDate).toLocaleDateString()}</>}
            <button onClick={() => handleEdit(task)} style={{ marginLeft: 8 }}>Edit</button>
            <button onClick={() => handleDelete(task._id)} style={{ marginLeft: 4 }}>Delete</button>
          </li>
        ))}
      </ul>
      {(!loading && tasks.length === 0) && <div>No tasks found.</div>}
    </div>
  );
};

export default TaskList;

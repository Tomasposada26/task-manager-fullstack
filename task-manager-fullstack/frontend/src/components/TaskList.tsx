import React, { useEffect, useState } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask, Task } from '../services/taskService';

const initialForm: Partial<Task> = {
  title: '',
  description: '',
  status: 'pending',
  priority: 'medium',
  dueDate: '',
};

const statusColors: Record<string, string> = {
  pending: '#fbbf24',
  'in-progress': '#3b82f6',
  completed: '#22c55e',
};

const priorityColors: Record<string, string> = {
  low: '#a3e635',
  medium: '#facc15',
  high: '#ef4444',
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
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

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
    setSuccessMsg(null);
    if (!form.title || form.title.length < 3) {
      setFormError('Title is required and must be at least 3 characters.');
      return;
    }
    try {
      if (editingId) {
        await updateTask(editingId, form);
        setSuccessMsg('Task updated successfully!');
      } else {
        await createTask(form);
        setSuccessMsg('Task created successfully!');
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
    setFormError(null);
    setSuccessMsg(null);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await deleteTask(id);
      setSuccessMsg('Task deleted successfully!');
      loadTasks();
    } catch (err: any) {
      setError(err.message || 'Error deleting task');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>My Tasks</h2>
      <div style={{ display: 'flex', gap: 16, marginBottom: 16, justifyContent: 'center' }}>
        <label>
          Status:
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </label>
        <label>
          Priority:
          <select value={priority} onChange={e => setPriority(e.target.value)}>
            <option value="">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24, alignItems: 'center', justifyContent: 'center' }}>
        <input
          name="title"
          placeholder="Title"
          value={form.title || ''}
          onChange={handleChange}
          required
          style={{ flex: 2, minWidth: 120 }}
        />
        <input
          name="description"
          placeholder="Description"
          value={form.description || ''}
          onChange={handleChange}
          style={{ flex: 3, minWidth: 120 }}
        />
        <select name="status" value={form.status || 'pending'} onChange={handleChange} style={{ flex: 1 }}>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <select name="priority" value={form.priority || 'medium'} onChange={handleChange} style={{ flex: 1 }}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          name="dueDate"
          type="date"
          value={form.dueDate || ''}
          onChange={handleChange}
          style={{ flex: 1 }}
        />
        <button type="submit" style={{ flex: 1, minWidth: 80 }}>{editingId ? 'Update' : 'Add'} Task</button>
        {editingId && <button type="button" onClick={() => { setForm(initialForm); setEditingId(null); }} style={{ flex: 1, minWidth: 80 }}>Cancel</button>}
        {formError && <span style={{ color: 'red', marginLeft: 8 }}>{formError}</span>}
        {successMsg && <span style={{ color: 'green', marginLeft: 8 }}>{successMsg}</span>}
      </form>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map(task => (
          <li key={task._id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, padding: 12, borderRadius: 6, background: '#f3f4f6', boxShadow: '0 1px 3px #0001' }}>
            <span style={{ fontWeight: 600 }}>{task.title}</span>
            <span style={{ color: '#6b7280' }}>{task.description}</span>
            <span style={{ background: statusColors[task.status], color: '#fff', borderRadius: 4, padding: '2px 8px', fontSize: 12 }}>{task.status}</span>
            <span style={{ background: priorityColors[task.priority], color: '#fff', borderRadius: 4, padding: '2px 8px', fontSize: 12 }}>{task.priority}</span>
            {task.dueDate && <span style={{ color: '#6366f1', fontSize: 12 }}>Due: {new Date(task.dueDate).toLocaleDateString()}</span>}
            <button onClick={() => handleEdit(task)} style={{ marginLeft: 'auto' }}>Edit</button>
            <button onClick={() => handleDelete(task._id)} style={{ color: '#ef4444' }}>Delete</button>
          </li>
        ))}
      </ul>
      {(!loading && tasks.length === 0) && <div style={{ textAlign: 'center', color: '#6b7280' }}>No tasks found.</div>}
    </div>
  );
};

export default TaskList;

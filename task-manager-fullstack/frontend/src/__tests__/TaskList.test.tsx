import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TaskList from '../components/TaskList';
import * as taskService from '../services/taskService';
import { NotificationProvider } from '../hooks/useNotification';

jest.mock('../services/taskService');

const mockTasks = [
  {
    _id: '1',
    title: 'Test Task 1',
    description: 'Description 1',
    status: 'pending',
    priority: 'medium',
    dueDate: '2026-02-01T00:00:00.000Z',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    _id: '2',
    title: 'Test Task 2',
    description: 'Description 2',
    status: 'completed',
    priority: 'high',
    dueDate: '2026-02-02T00:00:00.000Z',
    createdAt: '2026-01-02T00:00:00.000Z',
    updatedAt: '2026-01-02T00:00:00.000Z',
  },
];

describe('TaskList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (taskService.fetchTasks as jest.Mock).mockResolvedValue({
      tasks: mockTasks,
      total: 2,
      page: 1,
      totalPages: 1,
    });
    (taskService.createTask as jest.Mock).mockResolvedValue(mockTasks[0]);
    (taskService.updateTask as jest.Mock).mockResolvedValue(mockTasks[0]);
    (taskService.deleteTask as jest.Mock).mockResolvedValue(undefined);
  });

  it('renders tasks and pagination', async () => {
    render(
      <NotificationProvider>
        <TaskList />
      </NotificationProvider>
    );
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Test Task 1')).toBeInTheDocument();
      expect(screen.getByText('Test Task 2')).toBeInTheDocument();
      expect(screen.getByText(/Page 1 of 1/)).toBeInTheDocument();
    });
  });

  it('can add a new task', async () => {
    render(
      <NotificationProvider>
        <TaskList />
      </NotificationProvider>
    );
    await waitFor(() => screen.getByText('Test Task 1'));
    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'New Task' } });
    fireEvent.click(screen.getByText(/Add Task/i));
    await waitFor(() => {
      expect(taskService.createTask).toHaveBeenCalled();
    });
  });
});

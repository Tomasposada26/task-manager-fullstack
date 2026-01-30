# task-manager-fullstack
A full-stack task management application with authentication, task prioritization, and status tracking, designed following clean architecture and agile practices.

## Project Overview
task-manager-fullstack is a professional full-stack web application designed to help users manage their daily tasks efficiently. The platform enables secure user registration, authentication, and personal task management, supporting prioritization and status tracking. Built with clean architecture and agile development practices, it is suitable for both individual users and teams.

## Main Features
- User authentication (registration, login, JWT-based sessions)
- Password encryption with bcrypt
- Role-based access control (user/admin)
- Task CRUD (create, read, update, delete)
- Task attributes: title, description, status, priority, due date, timestamps
- Filtering tasks by status and priority
- Protected routes (backend and frontend)
- Data validation and centralized error handling
- Responsive and clean user interface

## Tech Stack
- **Backend:** Node.js, Express.js
- **Frontend:** React (functional components, hooks)
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT (JSON Web Tokens)
- **Development Environment:** Visual Studio Code

## System Architecture
The application is divided into two main modules: backend and frontend. The backend exposes a RESTful API, handling authentication, authorization, and all business logic related to users and tasks. The frontend consumes this API, providing a user-friendly interface for task management. The database stores user and task data, ensuring each task is associated with its creator. The architecture follows separation of concerns, with clear distinctions between controllers, services, models, and routes.

## Project Structure
```
task-manager-fullstack/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   └── README.md
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── utils/
│   └── README.md
│
└── README.md
```

## Installation and Setup Instructions

### Backend
1. Navigate to the backend directory:
   ```
   cd backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with your environment variables (e.g., MongoDB URI, JWT secret).
4. Start the backend server:
   ```
   npm run dev
   ```

### Frontend
1. Navigate to the frontend directory:
   ```
   cd frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the frontend development server:
   ```
   npm start
   ```

## API Endpoints Overview

| Method | Endpoint           | Description                    | Protected |
|--------|--------------------|-------------------------------|-----------|
| POST   | /api/auth/register | Register new user             | No        |
| POST   | /api/auth/login    | User login                    | No        |
| GET    | /api/tasks         | Get all tasks (user)          | Yes       |
| POST   | /api/tasks         | Create new task               | Yes       |
| PUT    | /api/tasks/:id     | Update task                   | Yes       |
| DELETE | /api/tasks/:id     | Delete task                   | Yes       |
| GET    | /api/users/me      | Get current user profile      | Yes       |

## Agile Methodology
This project follows agile principles, with a backlog of user stories and technical tasks managed for iterative development. User stories focus on delivering value to end users, while technical tasks ensure code quality and maintainability.

## Future Improvements
- Task pagination and search
- Password recovery functionality
- Notification system for deadlines
- Enhanced admin features
- Improved UI/UX and accessibility

## Author
**Name:** Tomas  
**Role:** Systems Engineering Student

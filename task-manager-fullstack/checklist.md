# Project Roadmap / Checklist

## 1. Initialization and Setup
- [x] Initialize backend with npm and TypeScript <!-- completed -->
- [x] Configure linter, prettier, and tsconfig <!-- completed -->
- [x] Install main dependencies (Express, Mongoose, JWT, bcrypt, dotenv, etc.) <!-- completed -->
- [x] Structure backend base folders <!-- completed -->

## 2. Backend Base Configuration
- [x] Configure .env and environment variables <!-- completed -->
- [x] Create basic Express server and MongoDB connection <!-- completed -->
- [x] Set up global middlewares (CORS, JSON, logger, error handling) <!-- completed -->

## 3. Models and Authentication
- [x] Create user model (Mongoose) <!-- completed -->
- [x] Create task model (Mongoose) <!-- completed -->
- [x] Implement user registration with validation and password hashing <!-- completed -->
- [x] Implement login and JWT generation <!-- completed -->
- [x] Authentication middleware and route protection <!-- completed -->
- [x] Basic role support (user/admin) <!-- completed -->

## 4. Task CRUD
- [x] Endpoints for create, read, update, delete tasks <!-- completed -->
- [x] Input data validation <!-- completed -->
- [x] Associate tasks to users <!-- completed -->
- [x] Filters by status and priority <!-- completed -->

## 5. Backend Robustness
- [x] Centralized error handling
- [x] Clear separation of controllers, services, routes <!-- completed -->
- [x] Document main endpoints in README

## 6. Frontend Initialization and Setup
- [x] Create React project with TypeScript
- [x] Configure linter, prettier, and base structure <!-- completed -->
- [x] Create folders for components, pages, hooks, services, utils <!-- completed -->

## 7. Frontend Authentication and User Flow
- [x] Registration and login pages and routing <!-- completed -->
- [x] Store and use JWT token <!-- completed -->
- [x] Protect private routes in React <!-- completed -->

## 8. Task CRUD in Frontend
 [x] Base structure for tasks CRUD (pages/components) <!-- completed -->
 [x] List user tasks <!-- completed -->
 [x] Create, edit, delete tasks from UI <!-- completed -->
 [x] Filters by status and priority <!-- completed -->
 [x] Clean and professional interface <!-- completed -->

## 9. Quality and Documentation
## 10. Suggested Improvements
- [ ] Add unit and integration tests (Jest for backend, React Testing Library for frontend)
- [ ] Configure secure environment variables for production
- [x] Add global error handling in frontend (notifications) <!-- completed -->
- [ ] Add pagination for large task lists

# Estructura del proyecto

```
task-manager-fullstack/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   ├── .env.example
│   ├── package.json
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   ├── public/
│   ├── package.json
│   └── ...
├── checklist.md
└── README.md
```

# Endpoints principales

## Auth
- POST /api/auth/register
- POST /api/auth/login

## Tareas
- CRUD: /api/tasks (protegido, requiere JWT)

# Estructura de carpetas y responsabilidades
- backend/src/controllers: Lógica de endpoints
- backend/src/services: Lógica de negocio
- backend/src/models: Modelos de datos
- backend/src/middlewares: Middlewares de autenticación, validación y errores
- frontend/src/pages: Vistas principales
- frontend/src/components: Componentes reutilizables
- frontend/src/services: Llamadas a API
- frontend/src/hooks: Hooks personalizados
- frontend/src/utils: Utilidades

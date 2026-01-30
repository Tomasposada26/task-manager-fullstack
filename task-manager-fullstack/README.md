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

---

## Secure environment variables for production

**Never commit your real .env file to version control.**

Use the provided `backend/.env.example` as a template. For production, set strong and unique values for:

- `JWT_SECRET_PROD`: Use a long, random string (at least 32 characters).
- `MONGO_URI_PROD`: Use a dedicated MongoDB Atlas URI with strong credentials and IP allowlist.
- `FRONTEND_URL`: Set to your deployed frontend domain (e.g., https://app.example.com).
- `NODE_ENV`: Always set to `production` in production environments.

**Recommended best practices:**
- Store secrets in a secure vault or environment manager (e.g., AWS Secrets Manager, Azure Key Vault).
- Rotate secrets regularly.
- Never use development secrets in production.
- Restrict database/network access to only required services.

See `backend/.env.example` for all required variables.

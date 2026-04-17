# LKMX Software Engineer Test

Este proyecto es una aplicación full-stack desarrollada con **Next.js (TypeScript)** para la gestión de usuarios y visualización de métricas (analytics). Incluye endpoints API, integración con PostgreSQL, contenerización con Docker y pruebas unitarias con Jest.

---

## 🚀 Descripción General

La aplicación permite:

- Crear usuarios
- Buscar y filtrar usuarios
- Editar usuarios existentes
- Eliminar usuarios de forma lógica (soft delete)
- Consultar métricas agregadas
- Ejecutar todo el sistema mediante Docker

---

## 🧱 Tecnologías Utilizadas

- **Frontend y Backend:** Next.js (App Router) con TypeScript
- **Base de datos:** PostgreSQL
- **Contenerización:** Docker y Docker Compose
- **Validación:** Zod
- **Pruebas:** Jest
- **Estilos:** Tailwind CSS

---

## 📁 Estructura del Proyecto

```text
lkmx-test/
├── src/
│   ├── app/
│   ├── components/
│   ├── services/
│   ├── repositories/
│   ├── lib/
│   ├── validations/
│   └── types/
│
├── db/
│   ├── init.sql
│   └── migrations/
│
├── tests/
│   └── api/
│
├── Dockerfile
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## ⚙️ Ejecución del Proyecto

### Opción 1: Usando Docker

```bash
docker compose up --build
```

Esto levantará:

- Aplicación en `http://localhost:3000`
- Base de datos PostgreSQL en el puerto `5432`

### Opción 2: Ejecución local

1. Instalar dependencias:

```bash
npm install
```

2. Crear el archivo `.env` con el siguiente contenido:

```env
DATABASE_URL=postgres://postgres:postgres@localhost:5432/lkmx_test
```

3. Ejecutar la aplicación:

```bash
npm run dev
```

---

## 🗄️ Base de Datos

Se utiliza PostgreSQL con una tabla principal llamada `users`.

### Campos principales

- `id`
- `name`
- `email`
- `status` (`active` | `deleted`)
- `created_at`
- `updated_at`

---

## 🧠 Eliminación Lógica (Soft Delete)

Los usuarios no se eliminan físicamente de la base de datos.

En su lugar, se actualiza su estado a:

```text
deleted
```

Esto permite:

- Mantener historial
- Evitar pérdida de información
- Mejorar la trazabilidad de los datos

---

## 🔌 Endpoints API

### Health Check

```http
GET /api/health
```

### Usuarios

```http
GET /api/users
```

Obtiene usuarios activos y soporta búsqueda por nombre o correo.

```http
POST /api/users
```

Crea un nuevo usuario.

```http
PUT /api/users/:id
```

Actualiza un usuario existente.

```http
DELETE /api/users/:id
```

Realiza eliminación lógica del usuario.

### Analytics

```http
GET /api/analytics
```

Devuelve métricas agregadas como:

- Total de usuarios
- Usuarios activos
- Usuarios eliminados
- Usuarios creados hoy
- Últimos usuarios registrados

---

## 🧩 Arquitectura

El proyecto sigue una arquitectura por capas:

- **API Routes:** manejo de requests y responses
- **Services:** lógica de negocio
- **Repositories:** acceso a base de datos

### Flujo general

```text
API Route → Service → Repository → Base de Datos
```

---

## 🧪 Pruebas

Se implementaron pruebas unitarias con Jest para los endpoints más relevantes del proyecto:

- `GET /api/analytics`
- `POST /api/users`
- `DELETE /api/users/:id`

### Ejecutar pruebas

```bash
npm test
```

### Enfoque de pruebas

- Uso de `jest.mock()` para aislar dependencias
- Validación del comportamiento del endpoint
- Sin interacción directa con la base de datos
- Cobertura sobre lógica crítica y manejo de errores

---

## 🐳 Docker

El proyecto incluye:

### Dockerfile

Construye la aplicación Next.js y la ejecuta en modo producción.

### docker-compose.yml

Orquesta los siguientes servicios:

- Aplicación
- Base de datos PostgreSQL

### Nota importante

Dentro del entorno Docker, la base de datos se accede mediante el host:

```text
db
```

No mediante `localhost`.

---

## 📌 Decisiones de Diseño

- **Soft Delete:** se eligió para preservar información histórica
- **Separación por capas:** facilita mantenimiento y escalabilidad
- **Pruebas unitarias selectivas:** enfocadas en lógica crítica
- **Docker:** garantiza portabilidad y reproducibilidad del entorno

---
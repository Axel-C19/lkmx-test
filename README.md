# LKMX Software Engineer Test

Este proyecto es una aplicación full-stack desarrollada con **Next.js (TypeScript)**, diseñada para la gestión de usuarios y visualización de métricas (analytics). Incluye endpoints API, integración con PostgreSQL, contenerización con Docker y pruebas unitarias con Jest.

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

- **Frontend & Backend:** Next.js (App Router) con TypeScript
- **Base de Datos:** PostgreSQL
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

### 🔹 Opción 1: Usando Docker

Asegúrate de tener Docker en ejecución y luego:

bash
docker compose up --build

Esto levantará:

Aplicación → http://localhost:3000
Base de datos PostgreSQL → puerto 5432

### 🔹 Opción 2: Ejecución Local
Instalar dependencias:
npm install
Asegurarse de tener PostgreSQL activo (local o vía Docker)
Configurar variables de entorno:

Crear archivo .env:

DATABASE_URL=postgres://postgres:postgres@localhost:5432/lkmx_test
Ejecutar la aplicación:
npm run dev

---

## 🗄️ Base de Datos

Se utiliza PostgreSQL con una tabla principal users.

Campos principales:
id
name
email
status (active | deleted)
created_at
updated_at



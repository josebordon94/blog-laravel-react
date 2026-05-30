# Blog App

A full-stack blog application built with Laravel and React, featuring AI-powered content generation.

---

## English

### Features

- User authentication (register, login, logout) using Laravel Sanctum
- Create, view, and delete blog posts
- Image upload support for posts
- AI content assistant powered by OpenAI (GPT-4o-mini)
- Responsive UI with Material UI (MUI)

### Tech Stack

**Backend:**
- PHP 8.3+
- Laravel 13
- PostgreSQL
- Laravel Sanctum (session-based authentication)
- OpenAI PHP SDK

**Frontend:**
- React 19
- TypeScript 6
- Vite 8
- Material UI (MUI) 9
- React Router 7
- Axios

### Prerequisites

- PHP 8.3 or higher
- Composer
- Node.js 18+
- PostgreSQL
- OpenAI API key (optional, for AI content generation)

### Installation

**Backend:**

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

Edit `.env` and configure your database credentials:

```
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=my_blog
DB_USERNAME=postgres
DB_PASSWORD=your_password
```

Run migrations:

```bash
php artisan migrate
```

Create storage symlink for uploaded images:

```bash
php artisan storage:link
```

Start the development server:

```bash
php artisan serve
```

**Frontend:**

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:8000`.

### AI Content Generation (Optional)

To enable the AI assistant, add your OpenAI API key to `backend/.env`:

```
OPENAI_API_KEY=sk-your-key-here
```

The AI assistant generates short paragraphs (3-4 lines) based on a topic prompt, using GPT-4o-mini with token limits to minimize costs.

### API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/register` | No | Register a new user |
| POST | `/api/login` | No | Login and receive token |
| POST | `/api/logout` | Yes | Logout current user |
| GET | `/api/posts` | No | List all posts |
| POST | `/api/posts` | Yes | Create a new post |
| DELETE | `/api/posts/{id}` | Yes | Delete own post |
| POST | `/api/ai/generate` | Yes | Generate AI content |

### Production Deployment

1. Copy `.env.production` to `.env` on your server
2. Generate a new `APP_KEY`: `php artisan key:generate`
3. Set `APP_DEBUG=false`
4. Configure your database credentials
5. Set `SESSION_SECURE_COOKIE=true` if using HTTPS
6. Update `SANCTUM_STATEFUL_DOMAINS` with your domain
7. Run migrations: `php artisan migrate --force`
8. Build frontend: `npm run build`
9. Configure Nginx to serve the built frontend

---

## Español

### Características

- Autenticación de usuarios (registro, login, logout) con Laravel Sanctum
- Crear, ver y eliminar publicaciones de blog
- Soporte para subir imágenes en las publicaciones
- Asistente de contenido con IA powered by OpenAI (GPT-4o-mini)
- Interfaz responsiva con Material UI (MUI)

### Stack Tecnológico

**Backend:**
- PHP 8.3+
- Laravel 13
- PostgreSQL
- Laravel Sanctum (autenticación basada en sesiones)
- OpenAI PHP SDK

**Frontend:**
- React 19
- TypeScript 6
- Vite 8
- Material UI (MUI) 9
- React Router 7
- Axios

### Requisitos Previos

- PHP 8.3 o superior
- Composer
- Node.js 18+
- PostgreSQL
- Clave API de OpenAI (opcional, para generación de contenido con IA)

### Instalación

**Backend:**

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

Edita `.env` y configura las credenciales de la base de datos:

```
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=my_blog
DB_USERNAME=postgres
DB_PASSWORD=tu_password
```

Ejecuta las migraciones:

```bash
php artisan migrate
```

Crea el enlace simbólico de storage para las imágenes subidas:

```bash
php artisan storage:link
```

Inicia el servidor de desarrollo:

```bash
php artisan serve
```

**Frontend:**

```bash
cd frontend
npm install
npm run dev
```

El frontend estará disponible en `http://localhost:5173` y el backend en `http://localhost:8000`.

### Generación de Contenido con IA (Opcional)

Para habilitar el asistente de IA, agrega tu clave API de OpenAI en `backend/.env`:

```
OPENAI_API_KEY=sk-tu-clave-aqui
```

El asistente de IA genera párrafos cortos (3-4 líneas) basados en un tema, usando GPT-4o-mini con límites de tokens para minimizar costos.

### Endpoints de la API

| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| POST | `/api/register` | No | Registrar nuevo usuario |
| POST | `/api/login` | No | Iniciar sesión y recibir token |
| POST | `/api/logout` | Sí | Cerrar sesión |
| GET | `/api/posts` | No | Listar todas las publicaciones |
| POST | `/api/posts` | Sí | Crear nueva publicación |
| DELETE | `/api/posts/{id}` | Sí | Eliminar publicación propia |
| POST | `/api/ai/generate` | Sí | Generar contenido con IA |

### Despliegue en Producción

1. Copia `.env.production` a `.env` en tu servidor
2. Genera una nueva `APP_KEY`: `php artisan key:generate`
3. Establece `APP_DEBUG=false`
4. Configura las credenciales de la base de datos
5. Establece `SESSION_SECURE_COOKIE=true` si usas HTTPS
6. Actualiza `SANCTUM_STATEFUL_DOMAINS` con tu dominio
7. Ejecuta las migraciones: `php artisan migrate --force`
8. Compila el frontend: `npm run build`
9. Configura Nginx para servir el frontend compilado

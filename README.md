# Movies

Aplicación full stack para **registro y gestión de películas por usuario**, con autenticación y almacenamiento persistente.

El proyecto está dividido en:
- **`client/`**: frontend en React + TypeScript (Vite).
- **`server/`**: API REST en Express + TypeScript + Prisma (SQLite).

## Características principales

- Registro e inicio de sesión con JWT.
- Sesiones persistidas en el cliente (token en `localStorage`).
- CRUD de películas por usuario autenticado.
- Filtros de búsqueda por título/director, género y año.
- Obtención opcional de póster desde OMDb (`OMDB_API_KEY`).
- UI responsive con Tailwind CSS.

## Flujo de uso

1. Crear cuenta o iniciar sesión.
2. Visualizar listado personal de películas.
3. Agregar nueva película.
4. Editar o eliminar películas existentes.
5. Filtrar resultados por texto, género o año.

## Tecnologías utilizadas

### Frontend (`client`)
- React 19
- TypeScript
- Vite
- React Router
- React Hook Form + Zod
- Tailwind CSS
- Axios

### Backend (`server`)
- Node.js + Express
- TypeScript
- Prisma ORM
- SQLite
- JWT (`jsonwebtoken`)
- `bcryptjs`
- `dotenv`
- Axios (integración con OMDb)

## Requisitos previos

- **Node.js** (recomendado: versión compatible con dependencias actuales)
- **npm**

## Instalación

Instala dependencias en ambos paquetes:

```bash
cd /home/runner/work/Movies/Movies/client
npm install

cd /home/runner/work/Movies/Movies/server
npm install
```

## Configuración de variables de entorno

El backend carga variables desde `server/.env`.

Crea el archivo `/home/runner/work/Movies/Movies/server/.env`:

```env
JWT_SECRET=tu_clave_super_segura
PORT=4000
OMDB_API_KEY=tu_api_key_opcional
```

### Variables detectadas en código

- `JWT_SECRET` (**obligatoria**): clave para firmar/verificar JWT.
- `PORT` (opcional): puerto del backend (por defecto `4000`).
- `OMDB_API_KEY` (opcional): habilita la búsqueda automática de pósteres.

## Ejecución local

### 1) Levantar backend

```bash
cd /home/runner/work/Movies/Movies/server
npm run dev
```

API disponible en `http://localhost:4000`.

### 2) Levantar frontend

En otra terminal:

```bash
cd /home/runner/work/Movies/Movies/client
npm run dev
```

Frontend disponible en `http://localhost:5173`.

## Scripts disponibles

### `client/package.json`

- `npm run dev` → inicia Vite en desarrollo.
- `npm run build` → compila TypeScript y genera build de producción.
- `npm run lint` → ejecuta ESLint.
- `npm run preview` → previsualiza el build generado.

### `server/package.json`

- `npm run dev` → inicia API en desarrollo con recarga (`ts-node-dev`).
- `npm run build` → compila TypeScript a `dist/`.
- `npm run start` → ejecuta el build compilado (`dist/index.js`).

## Build y despliegue

### Frontend

```bash
cd /home/runner/work/Movies/Movies/client
npm run build
npm run preview
```

### Backend

```bash
cd /home/runner/work/Movies/Movies/server
npm run build
npm run start
```

## Estructura relevante del proyecto

```text
Movies/
├─ client/
│  ├─ src/
│  │  ├─ pages/          # Login, Register, Movies, MovieForm
│  │  ├─ components/     # Navbar, MovieCard, UI
│  │  ├─ context/        # AuthContext
│  │  └─ api.ts          # Cliente Axios e interceptor de 401
│  └─ package.json
├─ server/
│  ├─ src/
│  │  ├─ routes/         # auth y movies
│  │  ├─ middleware/     # auth JWT
│  │  ├─ lib/            # integración OMDb
│  │  ├─ config.ts       # carga de .env y JWT_SECRET
│  │  └─ index.ts        # bootstrap de Express
│  ├─ prisma/
│  │  └─ schema.prisma   # modelos User y Movie (SQLite)
│  └─ package.json
└─ README.md
```

## Contribución

1. Haz un fork del repositorio.
2. Crea una rama para tu cambio.
3. Realiza tus cambios y valida build/lint en los paquetes afectados.
4. Envía un Pull Request con una descripción breve y clara.

## Licencia

No se encontró un archivo de licencia en la raíz del repositorio.

Como referencia, `server/package.json` declara licencia `ISC`, pero conviene confirmar la licencia oficial del repositorio a nivel global.

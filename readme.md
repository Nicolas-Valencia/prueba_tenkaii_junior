Prueba Técnica - Gestión de Tareas (Kanban con IA)

Este proyecto implementa un sistema de gestión de tareas estilo **Kanban** con un backend en NestJS + Prisma, un frontend en React + Vite, y automatización con n8n junto con un Agente de IA para interactuar con el sistema.

Tecnologías Utilizadas

### Backend
- [NestJS] Framework Node.js para la API
- [Prisma] ORM para BD
- [Prisma] Base de datos relacional
- [Docker] Contenedores para backend y n8n

### Frontend
- [React] + [Vite]
- [Axios] Cliente HTTP para la API
- [dnd-kit] Drag & Drop en el tablero Kanban
- [CSS] Estilos

### Automatización
- [n8n] Automatización de flujos
- [AI_Agent] (Gemini) - Interacción inteligente con tareas y usuarios

---

### Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/prueba_tenkaii.git
cd prueba_tenkaii


### Configuración Backend (NestJS + Prisma)
cd backend
npm install


Configura las variables de entorno en un archivo .env:

DATABASE_URL="file:./dev.db"
PORT=3000


Genera el cliente Prisma y ejecuta migraciones:

npx prisma generate
npx prisma migrate dev --name init


Levanta el servidor:

npm run start:dev


La API estará disponible en:
-> http://localhost:3000

### 3. Configuración Frontend (React + Vite)
cd frontend
npm install

*Version requerida de Node 20.19* 

Levanta la aplicación:

npm run dev


La app estará disponible en:
-> http://localhost:5173

### 4. Automatización con n8n

Asegúrate de tener Docker instalado.
Crea una red para conectar backend y n8n:

docker network create kanban_net


Levanta n8n:

docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  --network kanban_net \
  n8nio/n8n


La interfaz estará disponible en:
-> http://localhost:5678

Configura un flujo en n8n con el archivo que está en ./Agente_de_Tareas.json:


Funcionalidades

✅ Backend

CRUD de Usuarios con validación de email único.

CRUD de Tareas relacionadas a un usuario.

Actualización de estado de tareas en tiempo real (Kanban).

✅ Frontend

Tablero Kanban drag & drop.

Crear nuevas tareas asignando responsable desde un dropdown de usuarios.

Expandir información de tarea con "Ver más...".

Eliminar tarea con confirmación (window.confirm).

✅ Automatización

n8n + AI Agent conectado al backend.

Consultas naturales sobre tareas.

Creación automática de tareas sugeridas.


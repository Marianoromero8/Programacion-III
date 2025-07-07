# Proyecto Fullstack con Docker, Node.js, PostgreSQL y React

## Integrantes

- Mariano Romero  
- Franco Panzone  
- Julian Dantezano  
- Luciano Ramos Cavero  
- Marcos Borri  

---

##  Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/)  
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

---

##  Cómo Usar el Proyecto

### 1. Instalación de Dependencias

Desde la carpeta raíz del proyecto:

```bash
cd backend
npm i

cd ../frontend
npm i
```

### 2. Configuración de Entorno

Crear un archivo .env en la carpeta backend/ con el siguiente contenido:

```bash
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=$2a$10$IXOCTjN19Cmw1fPBwytvl.xWxFukyFrFDSoI.lUjVAdkwIyqp9DpW
ADMIN_PASSWORD_SIN_HASH=123456
JWT_SECRET=mi_clave_secreta_segura
JWT_EXPIRES_IN=1h
```

### 3. Levantar los Contenedores con Docker

Primero, construir y levantar los contenedores:

```bash
docker-compose build
docker-compose up -d
```

Luego, ingresar al contenedor del backend para ejecutar las migraciones y los seeders:

```bash
docker-compose exec backend sh

# Dentro del contenedor:
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
exit
```

##  Dependencias

###  Backend

- **cors**: Permite que el frontend (React) se comunique con el backend (Express) desde un dominio diferente (Cross-Origin Resource Sharing).
- **jsonwebtoken (JWT)**: Autenticación basada en tokens. Verifica la identidad del usuario en rutas protegidas.
- **bcryptjs**: Encripta contraseñas antes de guardarlas y las compara de forma segura durante el login.
- **dotenv**: Carga variables de entorno desde un archivo `.env` (claves secretas, puertos, datos de la base, etc.).
- **express**: Framework principal del backend. Define rutas, middleware y estructura la API RESTful.
- **express-rate-limit**: Middleware para limitar la cantidad de peticiones por IP. Previene ataques de fuerza bruta.
- **express-validator**: Middleware para validar y sanitizar datos en las rutas (alternativa o complemento a Joi).
- **helmet**: Establece cabeceras HTTP seguras para proteger contra vulnerabilidades como XSS y clickjacking.
- **joi**: Validación de datos avanzada para el cuerpo de las solicitudes (req.body).
- **morgan**: Logger de peticiones HTTP. Útil para debug y monitoreo.
- **pg**: Cliente de PostgreSQL para Node.js. Permite conectar Express con la base de datos.
- **pg-hstore**: Serializa datos para PostgreSQL (requerido por Sequelize).
- **redis**: Cliente para Redis. Se usa como cache o para almacenar sesiones.
- **sequelize**: ORM que facilita la interacción con PostgreSQL usando modelos en JavaScript.

---

###  Frontend

- **@heroicons/react**: Íconos SVG listos para usar en componentes React. Ideal para interfaces limpias y modernas.
- **@testing-library/jest-dom**: Extensiones de aserción para Jest (como `toBeInTheDocument`).
- **@testing-library/react**: Testing de componentes React desde la perspectiva del usuario final.
- **@testing-library/user-event**: Simula eventos del usuario (clics, tipeos) de forma realista.
- **classnames**: Permite aplicar clases CSS condicionalmente de forma clara.
- **date-fns**: Utilidades para manipular fechas (formateo, comparaciones, suma/resta de fechas).
- **lodash**: Conjunto de utilidades para trabajar con arrays, objetos, strings, etc.
- **react**: Biblioteca base para construir interfaces de usuario en forma de componentes.
- **react-dom**: Monta la app React en el DOM del navegador (`ReactDOM.createRoot`, etc.).
- **react-hook-form**: Manejo eficiente de formularios con validación y mínimo re-renderizado.
- **react-hot-toast**: Librería para mostrar notificaciones (toasts) modernas y personalizables.
- **react-query**: Manejo del estado de datos remotos (fetch, cache, sincronización automática).
- **react-router-dom**: Enrutamiento para aplicaciones SPA en React.
- **react-scripts**: Scripts preconfigurados de Create React App (CRA) para desarrollo, build y testing.


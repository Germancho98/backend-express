# Proyecto de Notas

Este es un proyecto de gestión de notas desarrollado con Node.js y Express. Permite a los usuarios registrarse, iniciar sesión y gestionar cursos y estudiantes.

## Estructura del Proyecto

La estructura del proyecto es la siguiente:

```bash
.
├── .env
├── .gitignore
├── app.js
├── config/
├── controllers/
│   ├── authController.js
│   ├── courseController.js
│   └── studentController.js
├── docker-compose.yml
├── Dockerfile
├── middlewares/
│   └── authMiddleware.js
├── models/
│   ├── course.js
│   ├── student.js
│   └── user.js
├── package.json
├── README.md
├── routes/
│   ├── auth.js
│   ├── course.js
│   └── students.js
├── test/
│   ├── auth.test.js
│   ├── course.test.js
│   ├── courseController.test.js
│   ├── student.test.js
│   └── studentController.test.js

## Instalación

Sigue los siguientes pasos para instalar el proyecto en tu entorno local:

1. **Clona el repositorio:**
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    ```
   
2. **Navega al directorio del proyecto:**
    ```bash
    cd proyecto-notas
    ```
   
3. **Instala las dependencias necesarias:**
    ```bash
    npm install
    ```

## Configuración

Antes de ejecutar el proyecto, debes configurar las variables de entorno:

1. **Crea un archivo `.env` en la raíz del proyecto** y añade las siguientes variables:
    ```bash
    MONGO_URI=<TU_URI_DE_MONGODB>
    PORT=<PUERTO_DEL_SERVIDOR>
    ```

## Uso

Para ejecutar el proyecto localmente:

1. **Inicia el servidor:**
    ```bash
    npm start
    ```

2. **Accede al servidor** en tu navegador en la siguiente URL:
    ```
    http://localhost:<PUERTO_DEL_SERVIDOR>
    ```

## Rutas de la API

A continuación se detallan las principales rutas de la API disponibles en el proyecto:

### Autenticación

- `POST /api/register` - Registrar un nuevo usuario.
- `POST /api/login` - Iniciar sesión en la plataforma.

### Cursos

- `POST /api/course` - Crear un nuevo curso (requiere autenticación).
- `GET /api/course` - Obtener todos los cursos (requiere autenticación).
- `GET /api/course/:id` - Obtener un curso específico por ID (requiere autenticación).
- `PUT /api/course/:id` - Actualizar un curso existente por ID (requiere autenticación).

### Estudiantes

- `POST /api/students` - Crear un nuevo estudiante.
- `GET /api/students` - Obtener la lista completa de estudiantes.
- `GET /api/students/:id` - Obtener información de un estudiante por ID.
- `PUT /api/students/:id` - Actualizar la información de un estudiante por ID.

## Pruebas

Para ejecutar las pruebas del proyecto, usa el siguiente comando:

```bash
npm test

## Docker

Para ejecutar el proyecto utilizando Docker, sigue estos pasos:

1. **Construye la imagen de Docker:**
    ```bash
    docker build -t proyecto-notas .
    ```

2. **Inicia los contenedores usando Docker Compose:**
    ```bash
    docker-compose up
    ```

   Esto iniciará los servicios definidos en el archivo `docker-compose.yml` y levantará el contenedor con la aplicación.

---

## Contribuciones

¡Las contribuciones son bienvenidas! Si deseas mejorar este proyecto, sigue estos pasos:

1. **Abre un issue** para discutir el cambio que te gustaría realizar.
2. **Envía un pull request** con tus cambios una vez que estén listos.

Asegúrate de seguir las mejores prácticas de codificación y mantener la coherencia con el estilo del proyecto.


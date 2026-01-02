# 👾 Colección de Videojuegos Retro - CRUD

![NodeJS](https://img.shields.io/badge/Node.js-18.x-green) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14.x-blue) ![Express](https://img.shields.io/badge/Express-4.x-lightgrey) ![Status](https://img.shields.io/badge/Status-Terminado-success)

Una aplicación web Full Stack para gestionar un inventario personal de videojuegos clásicos. Permite crear, leer, actualizar y eliminar (CRUD) registros de una base de datos PostgreSQL.

Este proyecto fue desarrollado como parte de la **Segunda Evaluación** de Desarrollo de Aplicaciones Web.

---

## 🚀 Demo del Despliegue

Puedes ver el proyecto funcionando en vivo aquí:
👉 **https://videojuegos-retro-manu.onrender.com/**

---

## 📸 Captura de Pantalla

<img width="1903" height="955" alt="image" src="https://github.com/user-attachments/assets/c2dfb748-3b49-4265-ab84-e39735937da1" />



---

## 🛠️ Tecnologías Utilizadas

* **Backend:** Node.js, Express.js
* **Base de Datos:** PostgreSQL (Alojada en Render)
* **Frontend:** HTML5, CSS3, Bootstrap 5, Vanilla JavaScript (Fetch API)
* **Despliegue:** Render.com

---

## ✨ Funcionalidades

1.  **Crear:** Formulario para añadir nuevos juegos a la colección.
2.  **Leer:** Visualización dinámica de todos los juegos en tarjetas.
3.  **Actualizar:** Posibilidad de editar los datos de cualquier juego y cambiar su estado (Pendiente/Jugando/Terminado).
4.  **Borrar:** Eliminación de juegos con confirmación de seguridad.


## 🔧 Instalación y Uso Local

Si quieres correr este proyecto en tu ordenador, sigue estos pasos:

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/TU_USUARIO/crud-videojuegos-clase.git](https://github.com/TU_USUARIO/crud-videojuegos-clase.git)
    cd crud-videojuegos-clase
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar Base de Datos:**
    Crea un archivo `.env` en la raíz con tus credenciales de PostgreSQL:
    ```env
    DB_USER=postgres
    DB_HOST=localhost
    DB_PASSWORD=tu_contraseña
    DB_NAME=postgres
    DB_PORT=5432
    PORT=3000
    ```

4.  **Crear la Tabla (SQL):**
    Ejecuta este script en tu gestor de base de datos (DBeaver/pgAdmin):
    ```sql
    CREATE TABLE videojuegos (
        id SERIAL PRIMARY KEY,
        titulo VARCHAR(100) NOT NULL,
        consola VARCHAR(50) NOT NULL,
        anio INTEGER,
        genero VARCHAR(50),
        estado VARCHAR(20) DEFAULT 'Pendiente',
        imagen_url TEXT
    );
    ```

5.  **Ejecutar el servidor:**
    ```bash
    node index.js
    ```
    Abre tu navegador en `http://localhost:3000`

---

## 📡 Documentación de la API

La aplicación expone los siguientes endpoints RESTful:

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `GET` | `/api/videojuegos` | Obtiene todos los juegos |
| `POST` | `/api/videojuegos` | Crea un juego nuevo |
| `PUT` | `/api/videojuegos/:id` | Actualiza un juego existente |
| `DELETE` | `/api/videojuegos/:id` | Elimina un juego |

---

## ✒️ Autor

* **Manuel Zarate** - *Desarrollo y Documentación*
* **Estudiante de:** Desarrollo de aplicaciones web

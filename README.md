# 🎵 Bailongo - Red Social de Música

Aplicación backend para una red social musical donde los usuarios pueden escuchar canciones, comentar, gestionar artistas, álbumes y canciones.  
Incluye autenticación con JWT, manejo de roles, y CRUD completo para todos los recursos principales.

Trabajo práctico para **Taller de Programación II**.

---

## 👥 Desarrolladores

* Felipe Valenzuela  
* Santiago Portelli  
* Diego Scopetta  

---

## 🚀 Requisitos

* Node.js (v18 o superior)  
* npm o yarn  
* MongoDB (local o Atlas)

---

## 🔮 Tecnologías

* Node.js + Express  
* MongoDB + Mongoose  
* JSON Web Tokens (JWT)  
* bcrypt  
* dotenv  
* CORS  
* Arquitectura MVC  

---

## 🚪 Levantar el entorno local

1. **Clonar el repositorio:**

git clone https://github.com/tu-usuario/Bailongo.git
cd Bailongo

2. **Instalar dependencias:**
npm install

3. **Crear el archivo .env en la raíz del proyecto:**
   PORT=3000
MONGO_URI=mongodb+srv://<usuario>:<password>@cluster/...
JWT_SECRET=claveSuperSecreta123

4. **Levantar el servidor:**
   npm run dev
El backend estará disponible en http://localhost:3000

## 📁 Estructura del proyecto
```bash
BailongoTp/
│
├── src/
│   ├── controllers/
│   │   ├── artistController.js
│   │   ├── authController.js
│   │   ├── roleController.js
│   │   ├── trackController.js
│   │   └── userController.js
│   │
│   ├── middleware/
│   │   ├── authMiddlewares.js
│   │   └── roleMiddlewares.js
│   │
│   ├── models/
│   │   ├── Artist.js
│   │   ├── Role.js
│   │   ├── Track.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── artistRoutes.js
│   │   ├── authRoutes.js
│   │   ├── roleRoutes.js
│   │   ├── trackRoutes.js
│   │   └── userRoutes.js
│   │
│   └── server.js
│
├── package.json
├── package-lock.json
├── .env (no se sube)
└── README.md
```

## ✅ Funcionalidades principales
Registro e inicio de sesión con contraseñas encriptadas

Tokens JWT para autenticación

Sistema de roles: admin, artista, user

CRUD completo de:
Usuarios
Artistas
Álbumes
Canciones
Comentarios

Protecciones mediante middleware según el rol

Comentarios en canciones (solo usuarios autenticados)

Eliminación de comentarios por autor o admin

## 🛣️ Endpoints principales

👤 Usuarios
| Método | Ruta            | Descripción             |
| ------ | --------------- | ----------------------- |
| POST   | /users/register | Registrar usuario       |
| POST   | /users/login    | Iniciar sesión          |
| GET    | /users/         | Listar usuarios (admin) |

🎤 Artistas
| Método | Ruta         | Descripción      |
| ------ | ------------ | ---------------- |
| POST   | /artists/    | Crear artista    |
| GET    | /artists/    | Listar artistas  |
| PUT    | /artists/:id | Editar artista   |
| DELETE | /artists/:id | Eliminar artista |

💿 Álbumes
| Método | Ruta        | Descripción    |
| ------ | ----------- | -------------- |
| POST   | /albums/    | Crear álbum    |
| GET    | /albums/    | Listar álbumes |
| PUT    | /albums/:id | Editar álbum   |
| DELETE | /albums/:id | Eliminar álbum |

🎵 Canciones
| Método | Ruta       | Descripción      |
| ------ | ---------- | ---------------- |
| POST   | /songs/    | Crear canción    |
| GET    | /songs/    | Listar canciones |
| PUT    | /songs/:id | Editar canción   |
| DELETE | /songs/:id | Eliminar canción |

💬 Comentarios
| Método | Ruta          | Descripción         |
| ------ | ------------- | ------------------- |
| POST   | /comments/    | Comentar canción    |
| GET    | /comments/    | Listar comentarios  |
| DELETE | /comments/:id | Eliminar comentario |

## 📊 Base de datos (MongoDB)
**Modelo: User**
| Campo    | Tipo                            |
| -------- | ------------------------------- |
| name     | String                          |
| email    | String                          |
| password | String (hashed)                 |
| role     | String (admin / artista / user) |

**Modelo: Artist**
| Campo | Tipo   |
| ----- | ------ |
| name  | String |
| bio   | String |

**Modelo: Album**
| Campo  | Tipo              |
| ------ | ----------------- |
| title  | String            |
| artist | ObjectId (Artist) |
| year   | Number            |

**Modelo: Song**
| Campo    | Tipo             |
| -------- | ---------------- |
| title    | String           |
| album    | ObjectId (Album) |
| duration | Number           |

**Modelo: Comment**
| Campo | Tipo            |
| ----- | --------------- |
| text  | String          |
| song  | ObjectId (Song) |
| user  | ObjectId (User) |


# Click&Home - Plataforma Inmobiliaria con Recorridos 3D

Una plataforma web completa de e-commerce inmobiliario con recorridos virtuales 3D implementados con React-Three-Fiber.

## 🚀 Características

- **Catálogo de Propiedades** con filtros avanzados
- **Recorridos Virtuales 3D** navegables en primera persona
- **Sistema de Autenticación** completo (login/registro)
- **Dashboard** para gestión de propiedades
- **Diseño Responsivo** con TailwindCSS
- **API REST** con Node.js y Express
- **Base de Datos MySQL** con tablas optimizadas

## 🛠️ Tecnologías

### Frontend
- React 18 + Vite
- TailwindCSS para estilos
- React-Three-Fiber para 3D
- React Router para navegación
- Axios para peticiones HTTP
- React Hook Form para formularios

### Backend
- Node.js + Express
- MySQL con mysql2
- JWT para autenticación
- Bcrypt para encriptación
- CORS habilitado

## 📦 Instalación

### Prerrequisitos
- Node.js 16+
- MySQL 8.0+
- npm o yarn

### 1. Clonar el repositorio
```bash
git clone <repository-url>
cd click-home
```

### 2. Instalar dependencias
```bash
# Instalar dependencias del backend
npm install

# Instalar dependencias del frontend
cd frontend
npm install
cd ..
```

### 3. Configurar base de datos
```bash
# Crear base de datos MySQL
mysql -u root -p
CREATE DATABASE clickhome_db;
```

### 4. Configurar variables de entorno
```bash
# Copiar archivo de ejemplo
cp env.example .env

# Editar .env con tus credenciales
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=clickhome_db
JWT_SECRET=tu_jwt_secret_aqui
PORT=5000
```

### 5. Poblar base de datos con datos de muestra
```bash
node src/scripts/seedDatabase.js
```

## 🚀 Ejecución

### Desarrollo
```bash
# Ejecutar backend y frontend simultáneamente
npm run dev

# O ejecutar por separado:

# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend  
npm run client
```

### Producción
```bash
# Construir frontend
cd frontend
npm run build
cd ..

# Ejecutar servidor
node src/server.js
```

## 🌐 URLs

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api
- **Base de datos**: MySQL en puerto 3306

## 📊 Estructura del Proyecto

```
click-home/
├── frontend/                 # Aplicación React
│   ├── src/
│   │   ├── components/       # Componentes reutilizables
│   │   ├── contexts/         # Context API
│   │   ├── pages/           # Páginas principales
│   │   └── App.jsx          # Componente principal
│   ├── public/
│   │   └── models/          # Modelos 3D (.glb)
│   └── package.json
├── src/                     # Backend Node.js
│   ├── config/             # Configuración DB
│   ├── middleware/         # Middleware de auth
│   ├── routes/            # Rutas de la API
│   ├── scripts/           # Scripts de utilidad
│   └── server.js          # Servidor principal
├── public/                # Archivos estáticos
└── package.json
```

## 🎮 Funcionalidades 3D

### Recorridos Virtuales
- Navegación en primera persona
- Controles de cámara intuitivos
- Carga de modelos .glb
- Interfaz de usuario optimizada

### Controles
- **Ratón**: Rotar vista
- **Rueda**: Zoom in/out  
- **Click + arrastrar**: Mover cámara
- **Doble click**: Centrar en objeto

## 👥 Usuarios de Prueba

La base de datos se puebla automáticamente con usuarios de prueba:

- **Admin**: maria@example.com / password123
- **Usuario**: carlos@example.com / password123
- **Usuario**: ana@example.com / password123

## 🏠 Propiedades de Muestra

El sistema incluye 6 propiedades de ejemplo con:
- Imágenes de alta calidad
- Descripciones detalladas
- Características específicas
- Modelos 3D (referencias)

## 🔧 API Endpoints

### Autenticación
- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/login` - Inicio de sesión
- `GET /api/auth/profile` - Perfil del usuario

### Propiedades
- `GET /api/properties` - Listar propiedades
- `GET /api/properties/:id` - Obtener propiedad
- `POST /api/properties` - Crear propiedad
- `PUT /api/properties/:id` - Actualizar propiedad
- `DELETE /api/properties/:id` - Eliminar propiedad

### Usuarios
- `GET /api/users` - Listar usuarios (admin)
- `GET /api/users/:id` - Obtener usuario
- `PUT /api/users/:id/role` - Cambiar rol (admin)

## 🎨 Diseño

### Colores
- **Primario**: Azul (#3b82f6)
- **Secundario**: Gris (#6b7280)
- **Fondo**: Gris claro (#f9fafb)

### Componentes
- Diseño moderno y profesional
- Responsive para móviles y desktop
- Animaciones suaves
- Iconos de Lucide React

## 🚀 Despliegue

### Variables de Entorno de Producción
```env
NODE_ENV=production
DB_HOST=tu_host_mysql
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_NAME=clickhome_db
JWT_SECRET=tu_jwt_secret_seguro
PORT=5000
```

### Comandos de Despliegue
```bash
# Construir para producción
cd frontend
npm run build

# Ejecutar en producción
NODE_ENV=production node src/server.js
```

## 📝 Notas de Desarrollo

- Los modelos 3D son referencias para demostración
- En producción, usar modelos reales optimizados
- Implementar CDN para imágenes y modelos
- Agregar tests unitarios y de integración
- Configurar HTTPS en producción

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

---

**Click&Home** - Revolucionando la experiencia inmobiliaria con tecnología 3D 🏠✨

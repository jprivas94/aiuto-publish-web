# VideoFlow Architect Pro

Plataforma de carga y análisis de videos con arquitectura moderna.

## 🚀 Características

- ✅ Carga de videos con barra de progreso
- ✅ Análisis automático de contenido
- ✅ Galería de videos con metadatos
- ✅ Servidor Express con soporte para CORS
- ✅ Interfaz moderna con Tailwind CSS y React

## 📋 Requisitos Previos

- Node.js 16+ y npm
- Git

## 🔧 Instalación

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/aiuto-publish-web.git
cd aiuto-publish-web

# Instalar dependencias
npm install
cd client && npm install

# Volver a la raíz
cd ..
```

## 🏃 Ejecutar en Desarrollo

```bash
npm run dev
```

Esto ejecutará:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

## 📦 Scripts Disponibles

- `npm run dev` - Ejecuta frontend y backend simultáneamente
- `npm run server` - Solo servidor backend
- `npm run client:dev` - Solo cliente frontend
- `npm run client:build` - Compilar para producción
- `npm run build` - Build completo
- `npm run start` - Iniciar solo el servidor

## 📁 Estructura del Proyecto

```
aiuto-publish-web/
├── client/                    # Frontend React + TypeScript
│   ├── src/
│   │   ├── components/       # Componentes React
│   │   ├── services/         # Servicios de API
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── postcss.config.js
├── server/
│   └── server/
│       └── server.js         # Backend Express
├── index.html                # HTML raíz
├── package.json
└── .env.example
```

## 🌐 API Endpoints

### POST `/api/upload`
Sube un archivo de video

**Request:**
- Parámetro: `video` (multipart/form-data)
- Tamaño máximo: 500MB

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "video-1234567890",
    "name": "mi-video.mp4",
    "size": 156000000,
    "type": "video/mp4",
    "uploadDate": "2024-12-25T12:00:00.000Z"
  }
}
```

## 🎨 Tecnologías Utilizadas

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS
- **Backend**: Express.js, Multer, CORS
- **Otros**: Concurrently (ejecutar múltiples procesos)

## 📝 Variables de Entorno

Crear archivo `.env` basado en `.env.example`:

```
VITE_API_URL=http://localhost:5000
PORT=5000
NODE_ENV=development
```

## 📄 Licencia

ISC

## 👤 Autor

Desarrollado para portafolio profesional

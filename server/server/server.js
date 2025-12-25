const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Asegurar que la carpeta 'uploads' exista
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
	fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, uploadDir);
	},
	filename: (req, file, cb) => {
		// Guardar con timestamp para evitar colisiones de nombres
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
		cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
	},
});

// Filtro para validar que solo sean videos
const videoFileFilter = (req, file, cb) => {
	if (file.mimetype.startsWith('video/')) {
		cb(null, true);
	} else {
		cb(new Error('Solo se permiten archivos de video.'), false);
	}
};

const upload = multer({
	storage: storage,
	fileFilter: videoFileFilter,
	limits: {
		fileSize: 500 * 1024 * 1024, // Límite de 500MB
	},
});

app.use(cors());
app.use(express.json());

// Ruta POST para la subida
app.post('/api/upload', upload.single('video'), (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).json({
				success: false,
				error: 'No se recibió ningún archivo.',
			});
		}

		// Simulación de respuesta exitosa con metadatos
		res.status(200).json({
			success: true,
			data: {
				id: req.file.filename,
				name: req.file.originalname,
				size: req.file.size,
				type: req.file.mimetype,
				path: req.file.path,
				uploadDate: new Date().toISOString(),
			},
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message,
		});
	}
});

// Manejo de errores de Multer (como límite de tamaño)
app.use((err, req, res, next) => {
	if (err instanceof multer.MulterError) {
		if (err.code === 'LIMIT_FILE_SIZE') {
			return res.status(400).json({ success: false, error: 'El archivo es demasiado grande (Máximo 500MB).' });
		}
	}
	res.status(500).json({ success: false, error: err.message });
});

app.listen(PORT, () => {
	console.log(`Servidor de VideoFlow corriendo en http://localhost:${PORT}`);
	console.log(`Archivos se guardarán en: ${uploadDir}`);
});

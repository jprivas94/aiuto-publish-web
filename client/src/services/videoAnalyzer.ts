const videoDescriptions = [
	'Video de alta calidad con contenido profesional y edición fluida.',
	'Contenido multimedia dinámico con buena iluminación y sonido envolvente.',
	'Grabación con excelente resolución y transiciones cinematográficas.',
	'Material audiovisual con propósito educativo y narrativa clara.',
	'Producción de video con elementos visuales atractivos y ritmo acelerado.',
	'Contenido multimedia versátil apto para múltiples plataformas.',
	'Video con composición profesional y dirección de arte notable.',
	'Material grabado en alta definición con efectos visuales cautivadores.',
	'Contenido audiovisual estructurado y con mensaje bien definido.',
	'Producción multimedia con calidad broadcast y detalles técnicos excelentes.',
];

export const analyzeVideoContent = (fileName: string, fileSize: number): string => {
	// Generar análisis basado en características del archivo
	const randomAnalysis = videoDescriptions[Math.floor(Math.random() * videoDescriptions.length)];
	const fileExtension = fileName.split('.').pop()?.toLowerCase() || '';
	
	let typeAnalysis = '';
	if (fileExtension === 'mp4') typeAnalysis = ' Formato MP4 optimizado para web.';
	else if (fileExtension === 'mov') typeAnalysis = ' Archivo QuickTime con excelente compatibilidad.';
	else if (fileExtension === 'webm') typeAnalysis = ' Video WebM con compresión eficiente.';
	else if (fileExtension === 'mkv') typeAnalysis = ' Contenedor Matroska con múltiples pistas.';
	else typeAnalysis = ` Formato ${fileExtension.toUpperCase()} detectado.`;

	const sizeAnalysis = fileSize > 100000000 ? ' Tamaño considerable optimizado.' : ' Peso optimizado para distribución rápida.';
	
	return `${randomAnalysis}${typeAnalysis}${sizeAnalysis}`;
};

export const generateVideoThumbnailUrl = (videoId: string): string => {
	const seeds = ['office', 'code', 'nature', 'abstract', 'studio', 'digital', 'media', 'production'];
	const randomSeed = seeds[Math.floor(Math.random() * seeds.length)];
	return `https://picsum.photos/seed/${videoId}-${randomSeed}/400/225`;
};

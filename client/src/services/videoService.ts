import { ApiResponse, VideoMetadata } from '../types';

export const uploadVideoToServer = async (
	file: File,
	onProgress: (progress: number) => void
): Promise<ApiResponse<VideoMetadata>> => {
	const formData = new FormData();
	formData.append('video', file);

	try {
		const xhr = new XMLHttpRequest();

		xhr.upload.addEventListener('progress', (event) => {
			if (event.lengthComputable) {
				const progress = (event.loaded / event.total) * 100;
				onProgress(progress);
			}
		});

		return new Promise((resolve, reject) => {
			xhr.addEventListener('load', () => {
				if (xhr.status === 200) {
					const response = JSON.parse(xhr.responseText);
					if (response.success) {
						resolve({
							success: true,
							data: response.data,
						});
					} else {
						resolve({
							success: false,
							error: response.error,
						});
					}
				} else {
					resolve({
						success: false,
						error: 'Error en la subida del archivo',
					});
				}
			});

			xhr.addEventListener('error', () => {
				reject({
					success: false,
					error: 'Error de conexión',
				});
			});

			xhr.open('POST', 'http://localhost:5000/api/upload');
			xhr.send(formData);
		});
	} catch (error) {
		return {
			success: false,
			error: error instanceof Error ? error.message : 'Error desconocido',
		};
	}
};

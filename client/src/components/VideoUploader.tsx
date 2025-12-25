import React, { useState, useRef } from 'react';
import { UploadStatus, VideoMetadata } from '../types';
import { uploadVideoToServer } from '../services/videoService';

interface VideoUploaderProps {
	onUploadComplete: (video: VideoMetadata) => void;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({ onUploadComplete }) => {
	const [dragActive, setDragActive] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [uploadState, setUploadState] = useState<{
		status: UploadStatus;
		progress: number;
		fileName: string;
	}>({
		status: UploadStatus.IDLE,
		progress: 0,
		fileName: '',
	});

	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFiles = async (files: FileList | null) => {
		if (!files || files.length === 0) return;

		const file = files[0];
		if (!file.type.startsWith('video/')) {
			setErrorMessage('Por favor, selecciona un archivo de video válido (MP4, WebM, etc).');
			return;
		}

		setErrorMessage(null);
		setUploadState({
			status: UploadStatus.UPLOADING,
			progress: 0,
			fileName: file.name,
		});

		const result = await uploadVideoToServer(file, (progress) => {
			setUploadState((prev) => ({ ...prev, progress }));
		});

		if (result.success && result.data) {
			setUploadState((prev) => ({ ...prev, status: UploadStatus.COMPLETED }));
			onUploadComplete({
				...result.data,
				status: UploadStatus.COMPLETED,
				progress: 100,
			});

			setTimeout(() => {
				setUploadState({ status: UploadStatus.IDLE, progress: 0, fileName: '' });
			}, 2000);
		} else {
			setUploadState({ status: UploadStatus.ERROR, progress: 0, fileName: '' });
			setErrorMessage(result.error || 'Ocurrió un error inesperado durante la subida.');
		}
	};

	const handleDrag = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
		else if (e.type === 'dragleave') setDragActive(false);
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);
		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			handleFiles(e.dataTransfer.files);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			handleFiles(e.target.files);
		}
	};

	return (
		<div className="w-full max-w-4xl mx-auto">
			<div
				className={`relative group rounded-2xl border-2 border-dashed transition-all duration-300 p-12 text-center
          ${
						dragActive
							? 'border-indigo-500 bg-indigo-500/10'
							: 'border-slate-700 hover:border-slate-500 bg-slate-800/30'
					}
          ${uploadState.status === UploadStatus.UPLOADING ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
				onDragEnter={handleDrag}
				onDragLeave={handleDrag}
				onDragOver={handleDrag}
				onDrop={handleDrop}
				onClick={() => uploadState.status === UploadStatus.IDLE && fileInputRef.current?.click()}
			>
				<input ref={fileInputRef} type="file" className="hidden" accept="video/*" onChange={handleChange} />

				{uploadState.status === UploadStatus.IDLE ? (
					<div className="space-y-4">
						<div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
							<i className="fa-solid fa-cloud-arrow-up text-2xl text-indigo-400"></i>
						</div>
						<h3 className="text-xl font-semibold text-white">Sube tu video al servidor</h3>
						<p className="text-slate-400 max-w-sm mx-auto">
							Arrastra archivos aquí o haz clic para explorar. Los archivos se guardarán localmente en{' '}
							<code className="bg-slate-700 px-1 rounded text-indigo-300">/uploads</code>.
						</p>
						{errorMessage && (
							<div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-2 rounded-lg text-sm mt-4 flex items-center justify-center space-x-2">
								<i className="fa-solid fa-circle-exclamation"></i>
								<span>{errorMessage}</span>
							</div>
						)}
					</div>
				) : (
					<div className="space-y-6">
						<div className="flex items-center justify-between mb-2">
							<span className="text-sm font-medium text-slate-300 truncate max-w-[200px]">{uploadState.fileName}</span>
							<span className="text-sm font-bold text-indigo-400">{Math.round(uploadState.progress)}%</span>
						</div>
						<div className="w-full bg-slate-700 rounded-full h-2.5 overflow-hidden">
							<div
								className="bg-indigo-500 h-2.5 rounded-full transition-all duration-300 ease-out"
								style={{ width: `${uploadState.progress}%` }}
							></div>
						</div>
						<div className="flex items-center justify-center space-x-3">
							{uploadState.status === UploadStatus.UPLOADING && (
								<i className="fa-solid fa-spinner fa-spin text-indigo-400"></i>
							)}
							<p className="text-sm text-slate-400">
								{uploadState.status === UploadStatus.UPLOADING
									? 'Transfiriendo datos al servidor...'
									: '¡Procesamiento finalizado!'}
							</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default VideoUploader;

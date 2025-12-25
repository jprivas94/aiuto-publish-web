import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import VideoUploader from './components/VideoUploader';
import VideoCard from './components/VideoCard';
import { VideoMetadata } from './types';
import { analyzeVideoContent, generateVideoThumbnailUrl } from './services/videoAnalyzer';

const App: React.FC = () => {
	const [videos, setVideos] = useState<VideoMetadata[]>([]);
	const [loading, setLoading] = useState(false);

	// Load initial mocks
	useEffect(() => {
		const mockVideos: VideoMetadata[] = [
			{
				id: '1',
				name: 'Demo_Corporativa_2024.mp4',
				size: 156000000,
				type: 'video/mp4',
				uploadDate: new Date().toISOString(),
				status: 'COMPLETED' as any,
				progress: 100,
				thumbnailUrl: 'https://picsum.photos/seed/office/400/225',
				aiAnalysis:
					'Presentación moderna de oficina con transiciones suaves y enfoque profesional en espacios colaborativos.',
			},
			{
				id: '2',
				name: 'Tutorial_Arquitectura_React.mov',
				size: 450000000,
				type: 'video/quicktime',
				uploadDate: new Date(Date.now() - 86400000).toISOString(),
				status: 'COMPLETED' as any,
				progress: 100,
				thumbnailUrl: 'https://picsum.photos/seed/code/400/225',
				aiAnalysis: 'Grabación de pantalla que muestra flujos de trabajo de desarrollo web con resaltado de sintaxis.',
			},
		];
		setVideos(mockVideos);
	}, []);

	const handleUploadComplete = async (newVideo: VideoMetadata) => {
		// Generar análisis local del video
		const analysis = analyzeVideoContent(newVideo.name, newVideo.size);
		const thumbnailUrl = generateVideoThumbnailUrl(newVideo.id);
		
		const enrichedVideo = {
			...newVideo,
			aiAnalysis: analysis,
			thumbnailUrl: thumbnailUrl,
		};

		setVideos((prev) => [enrichedVideo, ...prev]);
	};

	return (
		<div className="min-h-screen flex flex-col">
			<Header />

			<main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
				<section className="mb-16">
					<div className="text-center mb-10">
						<h1 className="text-4xl font-extrabold text-white sm:text-5xl mb-4">
							Arquitectura de Video de Clase Mundial
						</h1>
						<p className="text-lg text-slate-400 max-w-2xl mx-auto">
							Sube, procesa y analiza tus contenidos de video con análisis automático local e inteligente.
						</p>
					</div>
					<VideoUploader onUploadComplete={handleUploadComplete} />
				</section>

				<section>
					<div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-4">
						<h2 className="text-2xl font-bold text-white flex items-center">
							<i className="fa-solid fa-photo-film mr-3 text-indigo-500"></i>
							Biblioteca de Activos
						</h2>
						<div className="flex space-x-2">
							<button className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-md text-sm hover:bg-slate-700 transition-colors">
								Recientes
							</button>
							<button className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-md text-sm hover:bg-slate-700 transition-colors">
								Nombre
							</button>
						</div>
					</div>

					{videos.length === 0 ? (
						<div className="text-center py-20 bg-slate-800/20 rounded-2xl border border-slate-700/50">
							<div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
								<i className="fa-solid fa-film text-3xl text-slate-600"></i>
							</div>
							<h3 className="text-xl font-medium text-slate-300">No hay videos aún</h3>
							<p className="text-slate-500 mt-2">Los videos que subas aparecerán aquí.</p>
						</div>
					) : (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
							{videos.map((video) => (
								<VideoCard key={video.id} video={video} />
							))}
						</div>
					)}
				</section>
			</main>

			<footer className="border-t border-slate-800 py-8 bg-slate-900/80">
				<div className="max-w-7xl mx-auto px-4 text-center">
					<p className="text-slate-500 text-sm">
						&copy; 2024 VideoFlow Architect Pro. Diseñado para rendimiento y escalabilidad.
					</p>
					<div className="mt-4 flex justify-center space-x-6">
						<a href="#" className="text-slate-400 hover:text-white transition-colors">
							<i className="fa-brands fa-github"></i>
						</a>
						<a href="#" className="text-slate-400 hover:text-white transition-colors">
							<i className="fa-brands fa-linkedin"></i>
						</a>
						<a href="#" className="text-slate-400 hover:text-white transition-colors">
							<i className="fa-brands fa-twitter"></i>
						</a>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default App;

import React from 'react';
import { VideoMetadata } from '../types';

interface VideoCardProps {
	video: VideoMetadata;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
	const formatSize = (bytes: number) => {
		if (bytes === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
	};

	const formatDate = (isoDate: string) => {
		return new Date(isoDate).toLocaleDateString('es-ES', {
			day: 'numeric',
			month: 'short',
			year: 'numeric',
		});
	};

	return (
		<div className="bg-slate-800/40 border border-slate-700 rounded-xl overflow-hidden hover:border-indigo-500/50 transition-all group">
			<div className="aspect-video relative overflow-hidden bg-slate-900">
				<img
					src={video.thumbnailUrl}
					alt={video.name}
					className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
				/>
				<div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
					<button className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 text-white">
						<i className="fa-solid fa-play ml-1"></i>
					</button>
				</div>
				<div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-[10px] font-bold text-white uppercase">
					{video.type.split('/')[1] || 'video'}
				</div>
			</div>
			<div className="p-4">
				<h4 className="font-semibold text-slate-100 truncate mb-1" title={video.name}>
					{video.name}
				</h4>
				<div className="flex items-center justify-between text-xs text-slate-400">
					<span>{formatSize(video.size)}</span>
					<div className="flex items-center">
						<i className="fa-regular fa-calendar mr-1.5"></i>
						{formatDate(video.uploadDate)}
					</div>
				</div>
				{video.aiAnalysis && (
					<div className="mt-4 pt-4 border-t border-slate-700/50">
						<div className="flex items-center space-x-2 mb-2 text-indigo-400 text-[10px] font-bold uppercase tracking-wider">
							<i className="fa-solid fa-wand-magic-sparkles"></i>
							<span>Análisis de IA</span>
						</div>
						<p className="text-xs text-slate-300 italic line-clamp-2">"{video.aiAnalysis}"</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default VideoCard;

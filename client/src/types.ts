export enum UploadStatus {
	IDLE = 'IDLE',
	UPLOADING = 'UPLOADING',
	PROCESSING = 'PROCESSING',
	COMPLETED = 'COMPLETED',
	ERROR = 'ERROR',
}

export interface VideoMetadata {
	id: string;
	name: string;
	size: number;
	type: string;
	uploadDate: string;
	status: UploadStatus;
	progress: number;
	aiAnalysis?: string;
	thumbnailUrl?: string;
}

export interface ApiResponse<T> {
	data?: T;
	error?: string;
	success: boolean;
}

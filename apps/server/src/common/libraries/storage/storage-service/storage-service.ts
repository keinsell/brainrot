import type {Multer} from 'multer'



export interface StorageService {
	upload(file: Multer): Promise<string>
}
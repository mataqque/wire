import { Request, Response } from 'express';
import { SocketManager } from '../../socket/socket';
const bcrypt = require('bcryptjs');
interface TypeGeneric {
	number: string;
	string: string;
}
export const helpers = {
	encryptPassword: async (password: string) => {
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);
		return hash;
	},
	matchPassword: async (password: string, savedPassword: string) => {
		try {
			return await bcrypt.compare(password, savedPassword);
		} catch (err) {
			return err;
		}
	},
	verifyUser: async (pool: any, res: any, email: string, password: string) => {
		res.json({ type: true, token: 'token' });
	},
	file_name: async (fileName: string) => {
		let onlyName = fileName.split('.')[0];
		return onlyName;
	},
	file_extension: async (filename: any) => {
		const documento = /(pdf|docx|html|zip|svg|avi)/g;
		const image = /(png|PNG|JPG|jpg|jpeg|web|gif|tif)/g;
		const audio = /(mp3)/g;
		const video = /(mpeg|mp4)/g;

		let ext = /\.[a-z]+$/i.exec(filename);
		let type = '';
		if (ext != null && ext.length > 0) {
			if (documento.test(ext[0])) type = 'documento';
			if (image.test(ext[0])) type = 'image';
			if (audio.test(ext[0])) type = 'audio';
			if (video.test(ext[0])) type = 'video';
		}

		let dataExt = { ext: ext, typeFile: type };
		return dataExt;
	},
	generateId: ({ type }: { type: string }): number | string => {
		const typeid: TypeGeneric = {
			number: new Date().getTime().toString(),
			string: Math.random().toString(36).substr(2, 18),
		};
		const typeIdDefault: string = typeid.string;
		return typeid[type as keyof TypeGeneric] || typeIdDefault;
	},
};

export const middlewareDefault = (req: Request, res: Response, next: any) => {
	res.status(200).json({ type: true, status: 200, message: 'Middleware default' });
};

export const normalizeWords = (word: string) => {
	const cadenaNormalizada = word.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
	return cadenaNormalizada;
};

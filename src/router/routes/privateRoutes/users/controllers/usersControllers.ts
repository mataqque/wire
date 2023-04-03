import { Request, Response } from 'express';
import { pool } from '../../../../../database/database';

const usersController = {
	getDataUsers: async (req: Request, res: Response) => {
		const users = await pool.promise().query('SELECT uuid_user,username,name,lastname,address,phone,email,id_photo_perfil,id_role,updated_at FROM users');
		console.log(users[0]);
		res.status(200).json({ type: true, status: 200, data: users[0] });
	},
	getDataUser: async (req: Request, res: Response) => {},
};
export { usersController };

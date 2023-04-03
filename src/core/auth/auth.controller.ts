import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { pool } from '../../database/database';
import { constantAnswer } from '../../utilities/constanst';
import { Manage_token } from '../../utilities/jwt.utilities';
import { Credential, IUserData } from './interface';
const bcrypt = require('bcryptjs');


export const AuthController = {
	login: async (req: Request, res: Response) => {
		const errors = validationResult(req);
		const { email, password }: Credential = req.body;
		await pool.query(`SELECT * FROM users WHERE ( username = ? )`, [email], async (err: any, results: any, field: any) => {
			try {
				if (err) {
					res.status(200).json({ status: 401,err });
				}
				if (results.length > 0) {
					const { uuid_user, lastname, name, username }: IUserData = results[0];
					const match = await bcrypt.compare(password, results[0].password);
					if (match) {
						let token = await Manage_token.sign(JSON.stringify({ uuid_user, lastname, name, username }));
						res.status(200).json({ type: true, token: token, status: 200 });
					} else {
						res.status(200).json({ status: 401, type: false, token: null });
					}
				}
				if (results.length == 0) {
					res.status(200).json({ status: 401, result: constantAnswer.USERNAME_PASSWORD_COMBINATION_ERROR, type: false });
				}
			} catch (err: any) {
				return err;
			}
		});
		// if (!errors.isEmpty()) {
		// }
	},
	register: async (req: Request, res: Response) => {},
	verifyToken: async (req: Request, res: Response, next: NextFunction) => {
		if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
			let token = req.headers.authorization.split(' ')[1];
			if (token) {
				let verify = await Manage_token.verify(token);
				if (verify) {
					const dataset: IUserData = Manage_token.parse(token);
					const dataUser = await pool.query(`SELECT * FROM users WHERE ( username = ? )`, [dataset.username]);
					const { uuid_user, lastname, name, username }: IUserData = dataUser[0];
					res.status(200).json({ type: true, status: 200, user: { uuid_user, lastname, name, username, role: 'Administador' } });
				} else {
					res.status(200).json({ token: false, status: 401 });
				}
			} else {
				res.status(200).json({ token: false, status: 401 });
			}
		} else {
			res.status(200).json({ token: false, status: 401 });
		}
	},
	verifyTokenBearer: async (req: Request, res: Response, next: NextFunction) => {
		if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
			let token = req.headers.authorization.split(' ')[1];
			if (token) {
				let verify = await Manage_token.verify(token);
				if (verify) {
					const {}: IUserData = Manage_token.parse(token);
					next();
				} else {
					res.status(200).json({ token: false, status: 401 });
				}
			} else {
				res.status(200).json({ token: false, status: 401 });
			}
		} else {
			res.status(200).json({ token: false, status: 401 });
		}
	},
};

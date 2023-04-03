import { NextFunction, Request, Response } from 'express';
import { Manage_token } from '../../utilities/jwt.utilities';

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
	let { token } = req.body;
	let verify = await Manage_token.verify(token);
	if (verify) {
		let dataSet = Manage_token.parse(token);
		next(dataSet);
	} else {
		res.status(401).json({ token: false });
	}
};

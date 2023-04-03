import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const validationRegister = (req: Request, res: Response, next: NextFunction) => {
	console.log(req)
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(200).json({ errors: errors.array() });
	} else {
		next();
		return res.status(200).json({ errors: errors.array() });
	}
};

export const validationReport = (req: Request, res: Response, next: NextFunction) => {
	const errores = validationResult(req);
	if (!errores.isEmpty()) {
		res.status(422).json({ errores: errores.array() });
	}
	next();
}
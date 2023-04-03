var jwt = require('jsonwebtoken');

export const Manage_token = {
	sign: (values: any) => {
		let token = jwt.sign(
			{
				data: JSON.stringify(values),
			},
			'secret',
			{ expiresIn: '1000h' },
			{ algorithm: 'HS256' }
		);
		return token;
	},
	verify: (values: any) => {
		try {
			let desencrypted = jwt.verify(values, 'secret', { algorithm: 'HS256' });
			return desencrypted;
		} catch (err) {
			if (err instanceof jwt.TokenExpiredError) {
				return false;
			}
			if (err instanceof jwt.JsonWebTokenError) {
				return false;
			}
			if (err instanceof jwt.NotBeforeError) {
				return false;
			}
			return err;
		}
	},
	parse(token: any) {
		let decoded = jwt.verify(token, 'secret', { algorithm: 'HS256' });
		return JSON.parse(JSON.parse(decoded.data));
	},
};

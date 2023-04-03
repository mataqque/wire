const { checkSchema, validationResult } = require('express-validator');

export const schemaValidationRegister = checkSchema({
	password: {
		isLength: {
			errorMessage: 'Password should be at least 7 chars long',
			// Multiple options would be expressed as an array
			options: { min: 7 },
		},
	},
	username: {
		in: ['body'],
		isLength: {
			errorMessage: 'Username must be at least 5 characters long',
			options: { min: 5 },
		},
		matches: {
			errorMessage: 'Username must not contain whitespaces or dashes',
			options: /^\S*$/,
		},
	},
	name: {
		in: ['body'],
		isLength: {
			errorMessage: 'Username must be at least 5 characters long',
			options: { min: 3 },
		},
		matches: {
			errorMessage: 'name must not contain whitespaces or dashes',
			options: /^\S*$/,
		},
	},
	lastname: {
		in: ['body'],
		isLength: {
			errorMessage: 'Username must be at least 5 characters long',
			options: { min: 3 },
		},
		matches: {
			errorMessage: 'lastname must not contain whitespaces or dashes',
			options: /^\S*$/,
		},
	},
	// Support bail functionality in schemas
	email: {
		errorMessage: 'Not a valid email',
		isEmail: {
			bail: true,
		},
	},
});

export const schemaValidationLogin = checkSchema({
	password: {
		isLength: {
			errorMessage: 'Password should be at least 7 chars long',
			// Multiple options would be expressed as an array
			options: { min: 7 },
		},
		notEmpty: {
			errorMessage: 'Password must not be empty'
		}
	},
	username: {
		in: ['body'],
		isLength: {
			errorMessage: 'Username must be at least 5 characters long',
			options: { min: 5 },
		},
		matches: {
			errorMessage: 'Username must not contain whitespaces or dashes',
			options: /^\S*$/,
		},
		notEmpty: {
			errorMessage: 'Username must not be empty'
		}
	},
});

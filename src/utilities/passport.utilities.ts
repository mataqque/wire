import { validationResult } from 'express-validator';
import { pool } from '../database/database';
import { helpers } from './helpers/helpers';
import { IRegisterUser } from './interface';
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

export class passportUtilities {
	public helpers = helpers;
	private connection;
	constructor() {
		this.connection = pool;
		this.passportInit();
	}
	passportInit() {
		passport.serializeUser(function (user: any, done: any) {
			done(null, user);
		});

		passport.deserializeUser(function (user: any, done: any) {
			done(null, user);
		});

		passport.use(
			'register',
			new LocalStrategy(
				{
					usernameField: 'username',
					passwordField: 'password',
					passReqToCallback: true,
				},
				async (req: any, user: any, pass: any, done: any) => {
					const { username, phone, email, password, name, lastname }: IRegisterUser = req.body;
					let newUser = {
						uuid_user: new Date().getTime(),
						username: username,
						name: name,
						lastname: lastname,
						password,
						email,
						phone,
						id_role: 1,
					};
					let checkUser = await pool.query(`SELECT * FROM users WHERE ( username = ? );`, username);
					try {
						if (checkUser.length > 0) {
							req.res.send('already exist username');
							return done(null, 'already exist username');
						} else {
							newUser.password = await this.helpers.encryptPassword(password);
							const result = await pool.query('INSERT INTO users SET ? ', newUser);
							req.res.send('User added');
							return done(null, newUser);
						}
					} catch (err) {
						console.log(err);
						req.res.send('error');
					}
				}
			)
		);
	}
}

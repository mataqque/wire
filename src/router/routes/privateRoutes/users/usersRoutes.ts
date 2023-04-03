import { usersController } from './controllers/usersControllers';

const Router = require('express').Router;

const router = Router();
router.post('/getDataUsers', usersController.getDataUsers);
router.post('/getDataUser', usersController.getDataUser);

export default router;

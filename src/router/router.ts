import { middlewareDefault } from '../utilities/helpers/helpers';
import usersRoutes from './routes/privateRoutes/users/usersRoutes';
const { Router } = require('express');
const router = Router();

router.use('/users', usersRoutes);

export default router;

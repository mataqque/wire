import { Request, Response } from 'express';
import homeRoutes from './routes/publicRoutes/home/homeRoutes';
import productRoutes from './routes/publicRoutes/products/productRoute';

const { Router } = require('express');
const routerPublic = Router();

routerPublic.use('/home', homeRoutes);
routerPublic.use('/', productRoutes);

export default routerPublic;

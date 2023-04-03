import { Request, Response } from 'express';
import { productController } from './controllers/productController';

const { Router } = require('express');
const router = Router();

router.get('/:categoria/:subcategoria?/:nombre', productController.getProduct);

export default router;

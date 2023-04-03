import { homeController } from './controllers/homeControllers';

const Router = require('express').Router;

const router = Router();
router.get('/getproducts', homeController.getProducts);
export default router;

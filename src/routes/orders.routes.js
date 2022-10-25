import { Router } from 'express';
import ordersController from '../controllers/orders.controller'

const router = Router();

router.post('/', ordersController.createOrder);
router.get('/:idUser', ordersController.getOrderById)

export default router;
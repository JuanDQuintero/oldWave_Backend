import { Router } from 'express';
import filterController from '../controllers/filter.controller';

const router = Router();

router.get('/', filterController.getAllFilters);

export default router;
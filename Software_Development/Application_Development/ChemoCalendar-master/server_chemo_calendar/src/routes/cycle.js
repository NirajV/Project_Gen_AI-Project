import express from 'express';
import { createCycleService, getAllCyclesService, getUniqueEventNameFromCyclesService, getCyclesByEventNameRepoService } from '../services/cycle.js';

const router = express.Router();

router.all('/create', createCycleService);
router.all('/all', getAllCyclesService);
router.all('/allFavoriteEvent', getUniqueEventNameFromCyclesService);
router.all('/eventName', getCyclesByEventNameRepoService)

export default router;
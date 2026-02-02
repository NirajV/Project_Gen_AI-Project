import express from 'express';
import { createHospitalService } from '../services/hospital.js';

const router = express.Router();

router.all('/create', createHospitalService);

export default router;
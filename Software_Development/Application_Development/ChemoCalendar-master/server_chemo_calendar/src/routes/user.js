import express from 'express';
import { loginService, createUserService, getAllUsersService, sendOtpService, savePasswordService } from '../services/user.js';

const router = express.Router();

router.all('/login', loginService);
router.all('/create', createUserService);
router.all('/all', getAllUsersService);
router.all('/sendOtp', sendOtpService);
router.all('/savePassword', savePasswordService);

export default router;
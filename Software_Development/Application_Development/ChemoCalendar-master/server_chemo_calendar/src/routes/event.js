import express from 'express';
import { createEventService, getAllEventsService, getEventByIdService, updateEventService, getFilteredEventsService, sendEventService } from '../services/event.js';

const router = express.Router();

router.all('/create', createEventService);
router.all('/all', getAllEventsService);
router.all('/filter', getFilteredEventsService);
router.all('/one', getEventByIdService);
router.all('/update', updateEventService);
router.all('/sendFile', sendEventService);

export default router;
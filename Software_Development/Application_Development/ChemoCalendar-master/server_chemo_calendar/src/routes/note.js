import express from 'express';
import { createNoteService, getAllNotesService, removeNoteService, updateNoteService } from '../services/note.js';

const router = express.Router();

router.all('/create', createNoteService);
router.all('/all', getAllNotesService);
router.all('/remove', removeNoteService);
router.all('/update', updateNoteService);

export default router;
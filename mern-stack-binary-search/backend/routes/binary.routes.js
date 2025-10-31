import express from 'express';
import { binaryArray, getUserArrays, deleteArray } from '../controller/binaryArrayController.js';
import checkAuth from '../middleware/auth.js';

const router = express.Router();

router.post('/', checkAuth, binaryArray);
router.get('/', checkAuth, getUserArrays);
router.delete('/:id', checkAuth, deleteArray);

export default router;

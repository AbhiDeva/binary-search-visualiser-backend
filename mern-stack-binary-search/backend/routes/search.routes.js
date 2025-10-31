import express from 'express';
import { saveSearch , getUserSearchHistory, getSearchById} from '../controller/searchController.js';

import checkAuth from '../middleware/auth.js';

const router = express.Router();

router.post('/', checkAuth, saveSearch);
router.get('/', checkAuth, getUserSearchHistory);
router.get('/:id',checkAuth, getSearchById);

export default router;





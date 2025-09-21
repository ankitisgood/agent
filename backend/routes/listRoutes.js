import express from 'express';
import upload from '../middleware/uploadMiddleware.js';
import { uploadAndDistribute, getListsByAgent } from '../controllers/listController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/upload', authMiddleware, upload.single('file'), uploadAndDistribute);
router.get('/:agentId', authMiddleware, getListsByAgent);

export default router;

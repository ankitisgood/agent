import express from 'express';
import { createAgent, getAgents, deleteAgent } from '../controllers/agentController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createAgent);
router.get('/', authMiddleware, getAgents);
router.delete('/:id', authMiddleware, deleteAgent);

export default router;

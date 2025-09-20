import Agent from '../models/Agent.js';
import bcrypt from 'bcrypt';

export const createAgent = async (req, res) => {
  const { name, email, mobile, password } = req.body;
  if (!name || !email || !mobile || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  const exists = await Agent.findOne({ email });
  if (exists) {
    return res.status(409).json({ message: 'Agent with this email already exists' });
  }
  const hashed = await bcrypt.hash(password, 10);
  const agent = await Agent.create({ name, email, mobile, password: hashed });
  res.status(201).json({ id: agent._id, name: agent.name, email: agent.email, mobile: agent.mobile });
};

export const getAgents = async (req, res) => {
  const agents = await Agent.find({}, '-password');
  res.json(agents);
};

export const deleteAgent = async (req, res) => {
  const { id } = req.params;
  const agent = await Agent.findByIdAndDelete(id);
  if (!agent) {
    return res.status(404).json({ message: 'Agent not found' });
  }
  res.json({ message: 'Agent deleted' });
};

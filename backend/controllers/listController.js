import List from '../models/List.js';
import Agent from '../models/Agent.js';
import xlsx from 'xlsx';
import fs from 'fs';

export const uploadAndDistribute = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  const ext = req.file.originalname.split('.').pop().toLowerCase();
  let rows = [];
  try {
    if (ext === 'csv') {
      const data = fs.readFileSync(req.file.path, 'utf8');
      const lines = data.split(/\r?\n/).filter(Boolean);
      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
      if (!headers.includes('firstname') || !headers.includes('phone') || !headers.includes('notes')) {
        return res.status(400).json({ message: 'Missing required columns' });
      }
      for (let i = 1; i < lines.length; i++) {
        const [firstName, phone, notes] = lines[i].split(',');
        if (firstName && phone) rows.push({ firstName, phone, notes });
      }
    } else {
      const workbook = xlsx.readFile(req.file.path);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = xlsx.utils.sheet_to_json(sheet, { header: 1 });
      const headers = json[0].map(h => h.trim().toLowerCase());
      if (!headers.includes('firstname') || !headers.includes('phone') || !headers.includes('notes')) {
        return res.status(400).json({ message: 'Missing required columns' });
      }
      for (let i = 1; i < json.length; i++) {
        const row = json[i];
        if (row[0] && row[1]) rows.push({ firstName: row[0], phone: row[1], notes: row[2] });
      }
    }
    fs.unlinkSync(req.file.path);
  } catch (err) {
    return res.status(400).json({ message: 'File parsing error', error: err.message });
  }
  if (!rows.length) return res.status(400).json({ message: 'No valid data found' });
  const agents = await Agent.find();
  if (!agents.length) return res.status(400).json({ message: 'No agents found' });
  let idx = 0;
  const result = agents.map(agent => ({ agentId: agent._id, agentName: agent.name, tasks: [] }));
  for (let i = 0; i < rows.length; i++) {
    const agent = agents[idx % agents.length];
    const listItem = await List.create({ ...rows[i], assignedTo: agent._id });
    result[idx % agents.length].tasks.push(listItem);
    idx++;
  }
  res.json({ summary: result });
};

export const getListsByAgent = async (req, res) => {
  const { agentId } = req.params;
  const lists = await List.find({ assignedTo: agentId });
  res.json(lists);
};

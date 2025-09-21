
import React, { useEffect, useState } from 'react';
import api from '../api';

export default function Agents() {
  const [agents, setAgents] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', mobile: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchAgents = async () => {
    try {
      const res = await api.get('/agents');
      setAgents(res.data);
    } catch (err) {
      setError('Failed to fetch agents');
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await api.post('/agents', form);
      setSuccess('Agent created successfully');
      setForm({ name: '', email: '', mobile: '', password: '' });
      fetchAgents();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create agent');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this agent?')) return;
    try {
      await api.delete(`/agents/${id}`);
      setAgents(agents.filter(a => a._id !== id));
    } catch (err) {
      setError('Failed to delete agent');
    }
  };

  return (
    <div className="rounded-xl bg-gray-800 shadow-lg p-8 text-white">
      <h2 className="text-2xl font-bold mb-6">Agents</h2>
      {error && <div className="mb-4 text-red-400">{error}</div>}
      {success && <div className="mb-4 text-green-400">{success}</div>}

      <form onSubmit={handleSubmit} className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div>
          <label className="block mb-1 text-gray-300">Name</label>
          <input name="name" value={form.name} onChange={handleChange} required className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-700 text-white focus:ring-2 focus:ring-orange-500" />
        </div>
        <div>
          <label className="block mb-1 text-gray-300">Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-700 text-white focus:ring-2 focus:ring-orange-500" />
        </div>
        <div>
          <label className="block mb-1 text-gray-300">Mobile</label>
          <input name="mobile" value={form.mobile} onChange={handleChange} required className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-700 text-white focus:ring-2 focus:ring-orange-500" placeholder="+91..." />
        </div>
        <div>
          <label className="block mb-1 text-gray-300">Password</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} required className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-700 text-white focus:ring-2 focus:ring-orange-500" />
        </div>
        <button type="submit" disabled={loading} className="md:col-span-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition disabled:opacity-50 mt-2">
          {loading ? 'Adding...' : 'Add Agent'}
        </button>
      </form>

      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full bg-gray-900 rounded-lg">
          <thead>
            <tr className="text-orange-400">
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Mobile</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {agents.map(agent => (
              <tr key={agent._id} className="border-b border-gray-700 hover:bg-gray-800">
                <td className="py-2 px-4">{agent.name}</td>
                <td className="py-2 px-4">{agent.email}</td>
                <td className="py-2 px-4">{agent.mobile}</td>
                <td className="py-2 px-4">
                  <button onClick={() => handleDelete(agent._id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

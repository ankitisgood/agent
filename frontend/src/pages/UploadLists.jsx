
import React, { useState } from 'react';
import api from '../api';

export default function UploadLists() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [summary, setSummary] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
    setSuccess('');
    setSummary([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    setSummary([]);
    if (!file) {
      setError('Please select a file');
      setLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await api.post('/lists/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccess('List uploaded and distributed successfully');
      setSummary(res.data.summary || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl bg-gray-800 shadow-lg p-8 text-white">
      <h2 className="text-2xl font-bold mb-6">Upload Lists</h2>
      {error && <div className="mb-4 text-red-400">{error}</div>}
      {success && <div className="mb-4 text-green-400">{success}</div>}

      <form onSubmit={handleSubmit} className="mb-8 flex flex-col md:flex-row gap-4 items-end">
        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileChange}
          className="bg-gray-900 border border-gray-700 text-white rounded px-3 py-2 focus:ring-2 focus:ring-orange-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition disabled:opacity-50"
        >
          {loading ? 'Uploading...' : 'Upload & Distribute'}
        </button>
      </form>

      {summary.length > 0 && (
        <div className="overflow-x-auto rounded-lg mt-8">
          <h3 className="text-xl font-bold mb-4 text-orange-400">Distribution Summary</h3>
          {summary.map((agent, idx) => (
            <div key={agent.agentId || idx} className="mb-8">
              <h4 className="text-lg font-semibold mb-2 text-orange-300">Agent: {agent.agentName}</h4>
              <table className="min-w-full bg-gray-900 rounded-lg mb-2">
                <thead>
                  <tr className="text-orange-400">
                    <th className="py-2 px-4 text-left">First Name</th>
                    <th className="py-2 px-4 text-left">Phone</th>
                    <th className="py-2 px-4 text-left">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {agent.tasks.map((task, i) => (
                    <tr key={task._id || i} className="border-b border-gray-700 hover:bg-gray-800">
                      <td className="py-2 px-4">{task.firstName}</td>
                      <td className="py-2 px-4">{task.phone}</td>
                      <td className="py-2 px-4">{task.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

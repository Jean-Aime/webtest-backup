"use client";
import { useState, useEffect } from "react";

interface Application {
  id: string;
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  coverLetter: string;
  resumeUrl: string;
  status: string;
  createdAt: string;
  career: {
    title: string;
    department: string;
  };
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch('/api/applications');
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch('/api/applications', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      });
      fetchApplications();
    } catch (error) {
      alert('Failed to update status');
    }
  };

  const filteredApplications = applications.filter(app => 
    filter === "all" || app.status === filter
  );

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    reviewing: applications.filter(a => a.status === 'reviewing').length,
    accepted: applications.filter(a => a.status === 'accepted').length,
    rejected: applications.filter(a => a.status === 'rejected').length
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Job Applications</h1>
        <p className="text-gray-600">Manage candidate applications</p>
      </div>

      <div className="grid grid-cols-5 gap-4 mb-8">
        <div className="bg-white border rounded-lg p-4">
          <div className="text-2xl font-bold">{stats.total}</div>
          <div className="text-sm text-gray-600">Total</div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-700">{stats.pending}</div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-700">{stats.reviewing}</div>
          <div className="text-sm text-gray-600">Reviewing</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-700">{stats.accepted}</div>
          <div className="text-sm text-gray-600">Accepted</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-red-700">{stats.rejected}</div>
          <div className="text-sm text-gray-600">Rejected</div>
        </div>
      </div>

      <div className="bg-white border rounded-lg">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex gap-2">
            {['all', 'pending', 'reviewing', 'accepted', 'rejected'].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded capitalize ${
                  filter === status ? 'bg-primary text-white' : 'bg-gray-100'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-4 font-semibold">Candidate</th>
                <th className="text-left p-4 font-semibold">Position</th>
                <th className="text-left p-4 font-semibold">Contact</th>
                <th className="text-left p-4 font-semibold">Applied</th>
                <th className="text-left p-4 font-semibold">Status</th>
                <th className="text-left p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((app) => (
                <tr key={app.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <div className="font-medium">{app.name}</div>
                    {app.linkedin && (
                      <a href={app.linkedin} target="_blank" className="text-xs text-blue-600 hover:underline">
                        LinkedIn →
                      </a>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="font-medium">{app.career.title}</div>
                    <div className="text-sm text-gray-600">{app.career.department}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm">{app.email}</div>
                    {app.phone && <div className="text-sm text-gray-600">{app.phone}</div>}
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {new Date(app.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <select
                      value={app.status}
                      onChange={(e) => updateStatus(app.id, e.target.value)}
                      className={`px-3 py-1 rounded text-sm font-medium ${
                        app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        app.status === 'reviewing' ? 'bg-blue-100 text-blue-800' :
                        app.status === 'accepted' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="reviewing">Reviewing</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <button className="text-primary hover:underline text-sm">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function AnalyticsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/analytics');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-8">Loading analytics...</div>;
  if (!data) return <div className="p-8">Failed to load analytics</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>

      <div className="grid grid-cols-5 gap-6 mb-8">
        <div className="bg-white border rounded-lg p-6">
          <div className="text-3xl font-bold text-primary">{data.overview.totalLeads}</div>
          <div className="text-sm text-gray-600 mt-2">Total Leads</div>
          <div className="text-xs text-green-600 mt-1">+{data.overview.leadsThisMonth} this month</div>
        </div>
        <div className="bg-white border rounded-lg p-6">
          <div className="text-3xl font-bold text-primary">{data.overview.totalApplications}</div>
          <div className="text-sm text-gray-600 mt-2">Total Applications</div>
          <div className="text-xs text-green-600 mt-1">+{data.overview.applicationsThisMonth} this month</div>
        </div>
        <div className="bg-white border rounded-lg p-6">
          <div className="text-3xl font-bold text-primary">{data.overview.totalInsights}</div>
          <div className="text-sm text-gray-600 mt-2">Published Insights</div>
        </div>
        <div className="bg-white border rounded-lg p-6">
          <div className="text-3xl font-bold text-primary">
            {data.overview.totalLeads > 0 ? Math.round((data.overview.leadsThisMonth / data.overview.totalLeads) * 100) : 0}%
          </div>
          <div className="text-sm text-gray-600 mt-2">Conversion Rate</div>
        </div>
        <div className="bg-white border rounded-lg p-6">
          <div className="text-3xl font-bold text-primary">
            {data.applicationsByStatus.find((s: any) => s.name === 'accepted')?._count || 0}
          </div>
          <div className="text-sm text-gray-600 mt-2">Hired</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Leads by Source</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.leadsBySource}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => entry.name}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.leadsBySource.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Applications by Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.applicationsByStatus}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => entry.name}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.applicationsByStatus.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

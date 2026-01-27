"use client";
import { useState, useEffect } from "react";
import { DataService } from "@/lib/data";
import { Industry } from "@/lib/types";

export default function AdminIndustriesPage() {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    overview: "",
    featured: false
  });

  useEffect(() => {
    loadIndustries();
  }, []);

  const loadIndustries = async () => {
    const data = await DataService.getIndustries();
    setIndustries(data);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      console.log("Update industry:", editingId, formData);
      alert("Industry updated successfully!");
    } else {
      console.log("Create industry:", formData);
      alert("Industry created successfully!");
    }
    
    resetForm();
    loadIndustries();
  };

  const handleEdit = (industry: Industry) => {
    setFormData({
      name: industry.name,
      slug: industry.slug,
      description: industry.description,
      overview: industry.overview,
      featured: industry.featured
    });
    setEditingId(industry.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this industry?")) {
      console.log("Delete industry:", id);
      alert("Industry deleted successfully!");
      loadIndustries();
    }
  };

  const resetForm = () => {
    setFormData({ name: "", slug: "", description: "", overview: "", featured: false });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Industries Management</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90"
          >
            {showForm ? "Cancel" : "+ Add Industry"}
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingId ? "Edit Industry" : "Create New Industry"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-')})}
                    className="w-full p-2 border rounded focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Slug *</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({...formData, slug: e.target.value})}
                    className="w-full p-2 border rounded focus:border-primary focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description *</label>
                <input
                  type="text"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full p-2 border rounded focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Overview</label>
                <textarea
                  rows={4}
                  value={formData.overview}
                  onChange={(e) => setFormData({...formData, overview: e.target.value})}
                  className="w-full p-2 border rounded focus:border-primary focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                  className="w-4 h-4"
                />
                <label className="text-sm font-medium">Featured Industry</label>
              </div>
              <div className="flex gap-2">
                <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90">
                  {editingId ? "Update" : "Create"}
                </button>
                <button type="button" onClick={resetForm} className="bg-gray-300 px-6 py-2 rounded-lg hover:bg-gray-400">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-4 font-semibold">Name</th>
                <th className="text-left p-4 font-semibold">Slug</th>
                <th className="text-left p-4 font-semibold">Featured</th>
                <th className="text-right p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {industries.map((industry) => (
                <tr key={industry.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{industry.name}</td>
                  <td className="p-4 text-gray-600">{industry.slug}</td>
                  <td className="p-4">
                    {industry.featured && <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Featured</span>}
                  </td>
                  <td className="p-4 text-right">
                    <button onClick={() => handleEdit(industry)} className="text-primary hover:underline mr-4">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(industry.id)} className="text-red-500 hover:underline">
                      Delete
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
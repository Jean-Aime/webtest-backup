"use client";
import { useState } from "react";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "industries", label: "Industries", icon: "🏭" },
    { id: "services", label: "Services", icon: "⚙️" },
    { id: "insights", label: "Insights", icon: "💡" },
    { id: "experts", label: "Experts", icon: "👥" },
    { id: "careers", label: "Careers", icon: "💼" },
    { id: "media", label: "Media", icon: "📰" }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">JAS.COM Admin</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Welcome, Admin</span>
              <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="p-6">
            <ul className="space-y-2">
              {tabs.map((tab) => (
                <li key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? "bg-primary text-white"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="flex-1 p-6">
          {activeTab === "dashboard" && (
            <div>
              <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">Total Industries</h3>
                  <p className="text-3xl font-bold text-primary">24</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">Active Services</h3>
                  <p className="text-3xl font-bold text-primary">18</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">Published Insights</h3>
                  <p className="text-3xl font-bold text-primary">156</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">Team Members</h3>
                  <p className="text-3xl font-bold text-primary">89</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "industries" && (
            <div>
              <iframe src="/admin/industries" className="w-full h-screen border-0" />
            </div>
          )}

          {activeTab === "insights" && (
            <div>
              <iframe src="/admin/insights" className="w-full h-screen border-0" />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
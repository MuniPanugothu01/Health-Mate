import React, { useState } from 'react';

// Sample data
const users = [
  { id: 1, name: "Alice Johnson", email: "alice@hospital.com", role: "Patient", status: "Active" },
  { id: 2, name: "Bob Williams", email: "bob@hospital.com", role: "Patient", status: "Inactive" },
  { id: 3, name: "Clara Brown", email: "clara@hospital.com", role: "Staff", status: "Active" },
];

const doctors = [
  { id: 1, name: "Dr. John Smith", specialty: "Cardiologist", email: "john.smith@hospital.com", status: "Active" },
  { id: 2, name: "Dr. Emily Davis", specialty: "Neurologist", email: "emily.davis@hospital.com", status: "Active" },
  { id: 3, name: "Dr. Michael Lee", specialty: "Pediatrician", email: "michael.lee@hospital.com", status: "Inactive" },
];

// User Management Component
const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg animate-fadeIn">
      <h2 className="text-xl font-bold mb-4 text-gray-800">User Management</h2>
      <input
        type="text"
        placeholder="Search users..."
        className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="space-y-4">
        {filteredUsers.map(user => (
          <div key={user.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-300">
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-gray-600">{user.email} - {user.role}</p>
            </div>
            <div className="flex space-x-2">
              <span className={`px-3 py-1 rounded-full text-sm ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {user.status}
              </span>
              <button className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
                Edit
              </button>
              <button className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Doctor Management Component
const DoctorManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg animate-fadeIn">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Doctor Management</h2>
      <input
        type="text"
        placeholder="Search doctors..."
        className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="space-y-4">
        {filteredDoctors.map(doctor => (
          <div key={doctor.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-300">
            <div>
              <p className="font-semibold">{doctor.name}</p>
              <p className="text-gray-600">{doctor.specialty} - {doctor.email}</p>
            </div>
            <div className="flex space-x-2">
              <span className={`px-3 py-1 rounded-full text-sm ${doctor.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {doctor.status}
              </span>
              <button className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
                Edit
              </button>
              <button className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Stats Component
const StatsCard = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fadeIn">
    <div className="bg-white p-6 rounded-lg shadow-lg text-center animate-pulse">
      <h3 className="text-lg font-semibold text-gray-800">Total Users</h3>
      <p className="text-3xl font-bold text-blue-500">{users.length}</p>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-lg text-center animate-pulse">
      <h3 className="text-lg font-semibold text-gray-800">Total Doctors</h3>
      <p className="text-3xl font-bold text-blue-500">{doctors.length}</p>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-lg text-center animate-pulse">
      <h3 className="text-lg font-semibold text-gray-800">Active Accounts</h3>
      <p className="text-3xl font-bold text-blue-500">{[...users, ...doctors].filter(item => item.status === 'Active').length}</p>
    </div>
  </div>
);

// Main Admin Dashboard Component
const Admin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-blue-800 text-white transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out z-20`}>
        <div className="p-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>
        <nav className="mt-6">
          <a href="#" className="block py-2 px-6 hover:bg-blue-700">Dashboard</a>
          <a href="#" className="block py-2 px-6 hover:bg-blue-700">Users</a>
          <a href="#" className="block py-2 px-6 hover:bg-blue-700">Doctors</a>
          <a href="#" className="block py-2 px-6 hover:bg-blue-700">Reports</a>
          <a href="#" className="block py-2 px-6 hover:bg-blue-700">Settings</a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="md:ml-64 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 animate-[fadeIn_0.7s_ease-in]">Welcome, Admin</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden bg-blue-500 text-white p-2 rounded-lg">
            {isSidebarOpen ? 'Close' : 'Menu'}
          </button>
        </div>
        <StatsCard />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <UserManagement />
          <DoctorManagement />
        </div>
      </div>
    </div>
  );
};

export default Admin;
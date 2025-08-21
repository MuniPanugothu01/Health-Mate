import React, { useState } from "react";

// Sample data
const doctorProfile = {
  name: "Dr. John Smith",
  specialty: "Cardiologist",
  email: "john.smith@hospital.com",
  phone: "+1 (555) 123-4567",
  image:
    "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg",
};

const appointments = [
  {
    id: 1,
    patient: "Alice Johnson",
    time: "10:00 AM",
    date: "2025-07-31",
    status: "Confirmed",
  },
  {
    id: 2,
    patient: "Bob Williams",
    time: "11:30 AM",
    date: "2025-07-31",
    status: "Pending",
  },
  {
    id: 3,
    patient: "Clara Brown",
    time: "2:00 PM",
    date: "2025-07-31",
    status: "Confirmed",
  },
];

const notifications = [
  {
    id: 1,
    message: "New patient registration: Alice Johnson",
    time: "9:00 AM",
  },
  { id: 2, message: "Lab results available for Bob Williams", time: "8:30 AM" },
];

// Profile Component
const ProfileCard = () => (
  <div className="bg-white p-6 rounded-lg shadow-lg animate-slideIn">
    <img
      src={doctorProfile.image}
      alt="Doctor"
      className="w-24 h-24 rounded-full mx-auto mb-4"
    />
    <h2 className="text-2xl font-bold text-center text-gray-800">
      {doctorProfile.name}
    </h2>
    <p className="text-center text-gray-600">{doctorProfile.specialty}</p>
    <p className="text-center text-gray-600">{doctorProfile.email}</p>
    <p className="text-center text-gray-600">{doctorProfile.phone}</p>
    <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">
      Edit Profile
    </button>
  </div>
);

// Appointments Component
const AppointmentsCard = () => (
  <div className="bg-white p-6 rounded-lg shadow-lg animate-fadeIn">
    <h2 className="text-xl font-bold mb-4 text-gray-800">
      Today's Appointments
    </h2>
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <div
          key={appointment.id}
          className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-300"
        >
          <div>
            <p className="font-semibold">{appointment.patient}</p>
            <p className="text-gray-600">
              {appointment.time} - {appointment.date}
            </p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              appointment.status === "Confirmed"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {appointment.status}
          </span>
        </div>
      ))}
    </div>
    <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">
      View All Appointments
    </button>
  </div>
);

// Stats Component
const StatsCard = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fadeIn">
    <div className="bg-white p-6 rounded-lg shadow-lg text-center animate-pulse">
      <h3 className="text-lg font-semibold text-gray-800">Patients Today</h3>
      <p className="text-3xl font-bold text-blue-500">12</p>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-lg text-center animate-pulse">
      <h3 className="text-lg font-semibold text-gray-800">Pending Reports</h3>
      <p className="text-3xl font-bold text-blue-500">5</p>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-lg text-center animate-pulse">
      <h3 className="text-lg font-semibold text-gray-800">Total Patients</h3>
      <p className="text-3xl font-bold text-blue-500">245</p>
    </div>
  </div>
);

// Notifications Component
const NotificationsCard = () => (
  <div className="bg-white p-6 rounded-lg shadow-lg animate-slideIn">
    <h2 className="text-xl font-bold mb-4 text-gray-800">Notifications</h2>
    <div className="space-y-4">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-300"
        >
          <p className="text-gray-800">{notification.message}</p>
          <p className="text-sm text-gray-600">{notification.time}</p>
        </div>
      ))}
    </div>
  </div>
);

// Main Dashboard Component
const DoctorProfile = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-blue-800 text-white transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-20`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold">Doctor Dashboard</h1>
        </div>
        <nav className="mt-6">
          <a href="#" className="block py-2 px-6 hover:bg-blue-700">
            Dashboard
          </a>
          <a href="#" className="block py-2 px-6 hover:bg-blue-700">
            Appointments
          </a>
          <a href="#" className="block py-2 px-6 hover:bg-blue-700">
            Patients
          </a>
          <a href="#" className="block py-2 px-6 hover:bg-blue-700">
            Reports
          </a>
          <a href="#" className="block py-2 px-6 hover:bg-blue-700">
            Settings
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="md:ml-64 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 animate-fadeIn">
            Welcome, {doctorProfile.name}
          </h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden bg-blue-500 text-white p-2 rounded-lg"
          >
            {isSidebarOpen ? "Close" : "Menu"}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <ProfileCard />
            <div className="mt-6">
              <NotificationsCard />
            </div>
          </div>
          <div className="md:col-span-2">
            <StatsCard />
            <div className="mt-6">
              <AppointmentsCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;

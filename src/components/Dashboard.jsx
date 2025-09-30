import React from "react";

export default function Dashboard({ email, onLogout }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow p-4 flex justify-end items-center">
        <span className="mr-4 text-gray-700 font-medium">{email}</span>
        <button
          onClick={onLogout}
          className="py-1 px-3 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </header>

      <main className="p-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard!</h1>
        <p className="text-gray-700">
          You are logged in as <strong>{email}</strong>.
        </p>
      </main>
    </div>
  );
}

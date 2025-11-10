import React, { useState, useEffect } from "react";
import { fetchBugs, createBug, updateBug, deleteBug } from "./api/api";
import BugForm from "./components/BugForm";
import BugList from "./components/BugList";
import ErrorBoundary from "./components/ErrorBoundary";

export default function App() {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchBugs();
        setBugs(data);
      } catch (error) {
        console.error("Error fetching bugs:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleCreate = async (bug) => {
    const created = await createBug(bug);
    setBugs((prev) => [created, ...prev]);
  };

  const handleUpdate = async (id, changes) => {
    const updated = await updateBug(id, changes);
    setBugs((prev) => prev.map((b) => (b.id === id ? updated : b)));
  };

  const handleDelete = async (id) => {
    await deleteBug(id);
    setBugs((prev) => prev.filter((b) => b.id !== id));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-green-50 to-green-100">
        <div className="text-lg font-semibold text-gray-600 animate-pulse">
          Loading bugs...
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-green-700 mb-2">
              🐞 MERN Bug Tracker
            </h1>
            <p className="text-gray-600">
              Track, update, and manage bugs efficiently
            </p>
          </header>

          <section className="mb-8">
            <BugForm onCreate={handleCreate} />
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Reported Bugs
            </h2>
            {bugs.length === 0 ? (
              <div className="text-center text-gray-500 italic">
                No bugs reported yet. Great job! 🎉
              </div>
            ) : (
              <BugList
                bugs={bugs}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            )}
          </section>
        </div>
      </div>
    </ErrorBoundary>
  );
}

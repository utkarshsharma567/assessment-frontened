import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function Home() {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/gigs")
      .then((res) => setGigs(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading gigs...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Available Gigs
        </h1>
        <p className="text-gray-500 mb-6">
          Browse projects and place your bid
        </p>

        {gigs.length === 0 && (
          <div className="bg-white p-6 rounded-xl shadow text-center text-gray-500">
            No gigs available
          </div>
        )}

        {/* Gig Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gigs.map((gig) => (
            <div
              key={gig._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {gig.title}
              </h2>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {gig.description}
              </p>

              <div className="mt-auto">
                <p className="text-lg font-bold text-green-600 mb-4">
                  ₹{gig.budget}
                </p>

                <Link
                  to={`/gig/${gig._id}`}
                  className="inline-block w-full text-center bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
                >
                  View & Bid
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

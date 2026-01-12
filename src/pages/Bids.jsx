import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

export default function Bids() {
  const { gigId } = useParams();
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hiringId, setHiringId] = useState(null);

  useEffect(() => {
    api
      .get(`/bids/${gigId}`)
      .then((res) => setBids(res.data))
      .catch(() => alert("Failed to load bids"))
      .finally(() => setLoading(false));
  }, [gigId]);

  const hire = async (bidId) => {
    try {
      setHiringId(bidId);
      await api.patch(`/bids/${bidId}/hire`);

      setBids((prev) =>
        prev.map((bid) =>
          bid._id === bidId ? { ...bid, status: "hired" } : bid
        )
      );

      toast.success("Freelancer hired successfully");
    } catch (error) {
      alert("Only client can hire freelancer");
    } finally {
      setHiringId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading bids...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Freelancer Bids
        </h1>
        <p className="text-gray-500 mb-6">
          Review bids and hire the best freelancer
        </p>

        {bids.length === 0 && (
          <div className="bg-white p-6 rounded-xl shadow text-center text-gray-500">
            No bids received yet
          </div>
        )}

        {/* Bids List */}
        <div className="space-y-4">
          {bids.map((bid) => (
            <div
              key={bid._id}
              className="bg-white rounded-xl shadow p-6 flex justify-between items-center"
            >
              {/* Left */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {bid.freelancerId?.name || "Freelancer"}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Bid Amount: <span className="font-medium">₹{bid.price}</span>
                </p>

                <span
                  className={`inline-block mt-2 px-3 py-1 text-xs rounded-full font-medium ${
                    bid.status === "hired"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {bid.status}
                </span>
              </div>

              {/* Right */}
              {bid.status === "pending" ? (
                <button
                  onClick={() => hire(bid._id)}
                  disabled={hiringId === bid._id}
                  className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                >
                  {hiringId === bid._id ? "Hiring..." : "Hire"}
                </button>
              ) : (
                <span className="text-green-600 font-semibold">
                  Hired
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

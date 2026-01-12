import { useParams } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

export default function GigDetails() {
  const { id } = useParams();
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submitBid = async () => {
    if (!price || !message) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      await api.post("/bids", {
        gigId: id,
        price,
        message,
      });

      toast.success("Bid submitted successfully");
      setPrice("");
      setMessage("");
    } catch (error) {
      toast.error(error.response?.data?.msg || "You must login as freelancer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8">

        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Submit Your Bid
        </h1>
        <p className="text-gray-500 mb-6">
          Place a competitive bid for this gig
        </p>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Price (₹)
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="e.g. 5000"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
        </div>

        {/* Message */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Why should you be hired?"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
        </div>

        {/* Button */}
        <button
          onClick={submitBid}
          disabled={loading}
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Bid"}
        </button>
      </div>
    </div>
  );
}

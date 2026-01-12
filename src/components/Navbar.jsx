import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  // Example pathname: /gig/64fa123abc
  const isGigPage = location.pathname.startsWith("/gig/");
  const gigId = isGigPage ? location.pathname.split("/")[2] : null;

  return (
    <nav className="bg-gray-900 text-white shadow">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-green-500">
          GigFlow
        </Link>

        {/* Links */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:text-green-400">
            Home
          </Link>

          <Link to="/post-gig" className="hover:text-green-400">
            Post Gig
          </Link>

          {/* ✅ SHOW ONLY ON GIG DETAILS PAGE */}
          {gigId && (
            <Link
              to={`/bids/${gigId}`}
              className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700"
            >
              View Bids
            </Link>
          )}

          <Link to="/login" className="hover:text-green-400">
            Login
          </Link>

          <Link
            to="/register"
            className="border border-green-600 px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}




import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PostGig from "./pages/PostGig";
import GigDetails from "./pages/GigDetails";
import Bids from "./pages/Bids";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      {/* Toast container */}
      <Toaster
        position="top-right"
        reverseOrder={false}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post-gig" element={<PostGig />} />
        <Route path="/gig/:id" element={<GigDetails />} />
        <Route path="/bids/:gigId" element={<Bids />} />
        console.log("gigId:", gigId);

      </Routes>
    </BrowserRouter>
  );
}

export default App;
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Home from "./pages/Home";
// import PostGig from "./pages/PostGig";
// import GigDetails from "./pages/GigDetails";
// import Bids from "./pages/Bids";
// import Navbar from "./components/Navbar";

// function App() {
//   return (
//     <BrowserRouter>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/post-gig" element={<PostGig />} />
//         <Route path="/gig/:id" element={<GigDetails />} />
//         <Route path="/bids/:gigId" element={<Bids />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

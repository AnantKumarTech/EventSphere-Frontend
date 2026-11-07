import { Route, Routes } from "react-router";

import Navbar from "./component/Navbar";
import NotFound from "./component/NotFound";
import Footer from "./component/Footer";
import Home from "./pages/Home";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 selection:bg-red-400 selection:text-amber-50">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 w-full">
        <Routes>
          <Route path="/" element={<Home/>} />

          {/* Handle invalid routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;

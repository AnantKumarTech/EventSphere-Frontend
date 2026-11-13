import { Route, Routes, useLocation } from "react-router";

import Navbar from "./component/Navbar";
import NotFound from "./component/NotFound";
import Footer from "./component/Footer";
import Home from "./pages/Home";
import { useEffect } from "react";
import EventDetailsPage from "./pages/EventDetailsPage";
import { Toaster } from "sonner";
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);
}

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 selection:bg-red-400 selection:text-amber-50">
      <ScrollToTop />
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 w-full">
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Handle invalid routes */}
          <Route path="*" element={<NotFound />} />
          <Route path="/events/:id" element={<EventDetailsPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
      <Toaster
        richColors
        toastOptions={{
          style: {
            borderRadius: "1rem",
            border: "1px solid #EBE8DF",
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontSize: "13px",
          },
        }}
      />
    </div>
  );
}

export default App;

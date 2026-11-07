import { Link } from "react-router";
import { Compass, Calendar, Bookmark, User } from "lucide-react";

function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo + Brand Name */}
          <div className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="EventSphere Logo"
              className="h-12 w-12 rounded-full object-cover cursor-pointer
  transition-all duration-300 ease-in-out
  hover:scale-110 hover:rotate-6 hover:shadow-lg
  hover:ring-4 hover:ring-red-200"
            />
            <h1 className="text-2xl font-bold tracking-tight">
              <span className="text-red-500">Event</span>
              <span className="text-gray-900">Sphere.</span>
            </h1>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              to="/explore"
              className="px-3.5 py-2 text-sm font-medium rounded-xl transition-colors inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 hover:bg-black/3"
            >
              <Compass className="w-4 h-4" />
              <span>Explore</span>
            </Link>

            <Link
              to="/schedule"
              className="px-3.5 py-2 text-sm font-medium rounded-xl transition-colors inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 hover:bg-black/3"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule</span>
            </Link>

            <Link
              to="/favorites"
              className="px-3.5 py-2 text-sm font-medium rounded-xl transition-colors inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 hover:bg-black/3"
            >
              <Bookmark className="w-4 h-4" />
              <span>Saved</span>
            </Link>

            <Link
              to="/profile"
              className="px-3.5 py-2 text-sm font-medium rounded-xl transition-colors inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 hover:bg-black/3"
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

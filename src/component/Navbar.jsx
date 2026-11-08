import { Link } from "react-router";
import {
  CalendarPlus,
  Compass,
  Calendar,
  Bookmark,
  User,
  Search,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

function Navbar() {
  const [hamburger, sethamburger] = useState(false);

  return (
    <>
      <nav className="w-full bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 h-20">
            {/* Logo + Brand Name */}
            <div className="flex items-center gap-2 shrink-0">
              <img
                src="/logo.png"
                alt="EventSphere Logo"
                className="h-12 w-12 rounded-full object-cover cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-6 hover:shadow-lg hover:ring-4 hover:ring-red-200"
              />

              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
                <span className="text-red-500">Event</span>
                <span className="text-gray-900">Sphere.</span>
              </h1>
            </div>

            {/* Navigation Links - Desktop */}
            <div className="hidden md:flex items-center gap-1">
              <Link
                to="/explore"
                className="px-3.5 py-2 text-sm font-medium rounded-xl inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 hover:bg-black/3"
              >
                <Compass className="w-4 h-4" />
                <span>Explore</span>
              </Link>

              <Link
                to="/schedule"
                className="px-3.5 py-2 text-sm font-medium rounded-xl inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 hover:bg-black/3"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule</span>
              </Link>

              <Link
                to="/favorites"
                className="px-3.5 py-2 text-sm font-medium rounded-xl inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 hover:bg-black/3"
              >
                <Bookmark className="w-4 h-4" />
                <span>Saved</span>
              </Link>

              <Link
                to="/profile"
                className="px-3.5 py-2 text-sm font-medium rounded-xl inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 hover:bg-black/3"
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </Link>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-2">
              {/* Hamburger Menu - Mobile Only */}
              <button
                onClick={() => sethamburger((prev) => !prev)}
                className="md:hidden p-2 rounded-xl bg-gray-100 border border-gray-200 text-gray-600 hover:bg-gray-200 transition"
              >
                {hamburger ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>

              {/* Search Icon - Tablet Only */}
              <button className="hidden sm:flex lg:hidden items-center justify-center p-2 rounded-xl bg-gray-100 border border-gray-200 text-gray-500 hover:bg-gray-200 transition">
                <Search className="w-5 h-5" />
              </button>

              {/* Search Bar - Laptop and Desktop */}
              <div className="hidden lg:flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-xl px-3 w-40 lg:w-56 xl:w-72 h-10">
                <Search className="w-4 h-4 text-gray-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search events..."
                  className="w-full min-w-0 bg-transparent outline-none text-sm"
                />
              </div>

              {/* Host Event + Coming Soon */}
              <div className="hidden lg:flex items-center gap-2">
                <button
                  disabled
                  className="inline-flex items-center justify-center gap-2 w-32 h-10 rounded-xl bg-red-500 text-white font-semibold text-sm cursor-not-allowed whitespace-nowrap"
                >
                  <CalendarPlus className="w-4 h-4 shrink-0" />
                  Host Event
                </button>

                <button
                  disabled
                  className="inline-flex items-center justify-center w-32 h-10 rounded-xl bg-red-50 text-red-500 border border-red-100 font-semibold text-sm cursor-not-allowed whitespace-nowrap"
                >
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hamburger Dropdown Menu */}
      {hamburger && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg p-4">
          {/* Search Bar - Mobile */}
          <div className="flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-xl px-3 h-11 mb-3">
            <Search className="w-4 h-4 text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search categories, events, venues..."
              className="w-full min-w-0 bg-transparent outline-none text-sm"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Link
              to="/explore"
              onClick={() => sethamburger(false)}
              className="px-3.5 py-3 text-sm font-medium rounded-xl inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 hover:bg-gray-100"
            >
              <Compass className="w-4 h-4" />
              <span>Explore</span>
            </Link>

            <Link
              to="/schedule"
              onClick={() => sethamburger(false)}
              className="px-3.5 py-3 text-sm font-medium rounded-xl inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 hover:bg-gray-100"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule</span>
            </Link>

            <Link
              to="/favorites"
              onClick={() => sethamburger(false)}
              className="px-3.5 py-3 text-sm font-medium rounded-xl inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 hover:bg-gray-100"
            >
              <Bookmark className="w-4 h-4" />
              <span>Saved</span>
            </Link>

            <Link
              to="/profile"
              onClick={() => sethamburger(false)}
              className="px-3.5 py-3 text-sm font-medium rounded-xl inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 hover:bg-gray-100"
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;

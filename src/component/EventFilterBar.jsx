import { setFormat, setIsPaid } from "@/store/slices/filterSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router";

function EventFilterBar() {
  // Redux dispatch
  const dispach = useDispatch();

  // Redux filters
  const filter = useSelector((state) => state.filters);

  // URL parameters
  const [searchParams, setSearchParam] = useSearchParams();

  // Active format
  const activeFormat = searchParams.get("format") || filter.format;

  // Active pricing
  const activeIsPaid = searchParams.get("isPaid") ?? filter.isPaid;

  // Pricing handler
  function handleIsPaid(entry) {
    dispach(setIsPaid(entry));

    // Copy parameters
    const params = new URLSearchParams(searchParams);

    if (entry === "") {
      params.delete("isPaid");
    } else if (typeof entry === "boolean") {
      params.set("isPaid", String(entry));
    } else {
      params.delete("isPaid");
    }

    // Update URL
    setSearchParam(params);
  }

  return (
    <div className="space-y-4">
      {/* Search filters */}
      <div className="bg-white rounded-2xl border border-[#EBE8DF] p-3 shadow-subtle flex flex-col md:flex-row items-stretch md:items-center gap-3">
        {/* Search input */}
        <div className="relative flex-1">
          <span className="text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 text-xs">
            🔍
          </span>
          <form>
            <input
              type="text"
              name="search"
              placeholder="Search by topic, category, artist, city, or venue..."
              className="w-full pl-9 pr-9 py-2 text-sm rounded-xl bg-[#FAF9F5] border border-[#DDD9CE] focus:bg-white focus:border-[#E65100] focus:ring-2 focus:ring-[#E65100]/20 text-[#111] placeholder-stone-400 outline-none transition-all"
            />
          </form>
        </div>

        {/* Location filter */}
        <div className="relative min-w-37.5">
          <span className="text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-xs">
            📍
          </span>
          <select
            name="city"
            className="w-full pl-8 pr-7 py-2 text-xs font-medium rounded-xl bg-[#FAF9F5] border border-[#DDD9CE] focus:border-[#E65100] outline-none text-stone-800 appearance-none cursor-pointer"
          >
            <option value="All">All Locations</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi NCR">Delhi NCR</option>
            <option value="Pune">Pune</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Jaipur">Jaipur</option>
          </select>
          <span className="text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-xs">
            ▼
          </span>
        </div>

        {/* Date filter */}
        <div className="relative">
          <button
            type="button"
            className="flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-xl border transition-all cursor-pointer select-none bg-[#FAF9F5] border-[#DDD9CE] text-stone-700 hover:bg-stone-100"
          >
            <span>📅</span>
            <span>Filter by Date</span>
            <span className="text-stone-400 text-xs">▼</span>
          </button>
        </div>

        {/* Sorting options */}
        <div className="relative min-w-35">
          <select
            name="sort"
            className="w-full px-3 py-2 text-xs font-medium rounded-xl bg-[#FAF9F5] border border-[#DDD9CE] focus:border-[#E65100] outline-none text-stone-800 appearance-none cursor-pointer"
          >
            <option value="startDate_asc">Earliest First</option>
            <option value="startDate_desc">Latest First</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="title_asc">Title: A – Z</option>
          </select>
          <span className="text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-xs">
            ▼
          </span>
        </div>

        {/* Reset button */}
        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-xl transition-colors shrink-0 cursor-pointer"
        >
          <span>🔄</span>
          <span>Reset</span>
        </button>
      </div>

      {/* Category filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {/* All categories */}
        <button
          type="button"
          className="px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer flex items-center gap-1.5 bg-[#1a1a1a] text-white shadow-sm"
        >
          <span>All Disciplines</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-white/20 text-white">
            42
          </span>
        </button>

        {/* Technology category */}
        <button
          type="button"
          className="px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer flex items-center gap-1.5 bg-white hover:bg-stone-100 text-stone-600 border border-[#E2DFD4]"
        >
          <span>Technology & AI</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-stone-100 text-stone-500">
            14
          </span>
        </button>

        {/* Music category */}
        <button
          type="button"
          className="px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer flex items-center gap-1.5 bg-white hover:bg-stone-100 text-stone-600 border border-[#E2DFD4]"
        >
          <span>Live Music & Concerts</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-stone-100 text-stone-500">
            9
          </span>
        </button>

        {/* Startup category */}
        <button
          type="button"
          className="px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer flex items-center gap-1.5 bg-white hover:bg-stone-100 text-stone-600 border border-[#E2DFD4]"
        >
          <span>Startups & Venture Capital</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-stone-100 text-stone-500">
            8
          </span>
        </button>

        {/* Fitness category */}
        <button
          type="button"
          className="px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer flex items-center gap-1.5 bg-white hover:bg-stone-100 text-stone-600 border border-[#E2DFD4]"
        >
          <span>Fitness & Marathons</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-stone-100 text-stone-500">
            5
          </span>
        </button>

        {/* Arts category */}
        <button
          type="button"
          className="px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer flex items-center gap-1.5 bg-white hover:bg-stone-100 text-stone-600 border border-[#E2DFD4]"
        >
          <span>Arts & Culture</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-stone-100 text-stone-500">
            4
          </span>
        </button>
      </div>

      {/* Format and pricing */}
      <div className="flex items-center justify-between text-xs text-stone-500 flex-wrap gap-2 pt-1">
        {/* Format selection */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-stone-700">Format:</span>
          {["", "in-person", "online", "hybrid"].map((f, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                dispach(setFormat(f));

                // Copy parameters
                const params = new URLSearchParams(searchParams);

                if (f) {
                  params.set("format", f);
                } else {
                  params.delete("format");
                }

                // Update URL
                setSearchParam(params);
              }}
              className={`px-2.5 py-1 rounded-lg border text-xs font-medium capitalize transition-all cursor-pointer  ${activeFormat === f ? "bg-stone-800 text-white border-stone-800" : "bg-white border-[#DDD9CE] text-stone-600 hover:bg-stone-50"}`}
            >
              {f === "" ? "All Formats" : f}
            </button>
          ))}
        </div>

        {/* Pricing selection */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-stone-700">Admission:</span>

          {/* All admission */}
          <button
            onClick={() => handleIsPaid("")}
            type="button"
            className={`px-2.5 py-1 rounded-lg border text-xs font-medium transition-all cursor-pointer ${activeIsPaid === "" ? "bg-stone-800 text-white border-stone-800" : "bg-white border-[#DDD9CE] text-stone-600 hover:bg-stone-50"}`}
          >
            All
          </button>

          {/* Free admission */}
          <button
            onClick={() => handleIsPaid(false)}
            type="button"
            className={`px-2.5 py-1 rounded-lg border text-xs font-medium transition-all cursor-pointer ${activeIsPaid === "false" ? "bg-green-700 text-white border-stone-800" : "bg-white border-[#DDD9CE] text-stone-600 hover:bg-stone-50"}`}
          >
            Free
          </button>

          {/* Paid admission */}
          <button
            onClick={() => handleIsPaid(true)}
            type="button"
            className={`px-2.5 py-1 rounded-lg border text-xs font-medium transition-all cursor-pointer ${activeIsPaid === "true" ? "bg-stone-800 text-white border-stone-800" : "bg-white border-[#DDD9CE] text-stone-600 hover:bg-stone-50"}`}
          >
            Paid
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventFilterBar;

import EventCard from "@/component/EventCard";
import Skeleton from "@/component/Skeleton";
import api from "@/lib/axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import { useInView } from "react-intersection-observer"
import EventFilterBar from "@/component/EventFilterBar";
import { useSelector } from "react-redux";

export default function ExplorePage() {
  const filters = useSelector((state) => state.filters);
    const { ref: observer, inView } = useInView();
  const [events, setEvent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
    const [pagination, setPagination] = useState({
    page: 1,
    total: 0,
    hasMore: false,
  });

  async function fetchEvent(page=1,append) {
    if (page==1){
   setIsLoading(true);
    }
    else{
setIsMoreLoading(true);
    } 
    try {
      const { data: event, pagination } = await api.get(
        `/api/events?page=${page}&format=${filters.format}`,
      );
     if (append) {
        setEvent((prev) => [...prev, ...event]);
      } else {
        setEvent(event);
      }
      setPagination(pagination);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to load events.");
    } finally {
      setIsLoading(false);
      setIsMoreLoading(false);
    }
  }
  useEffect(() => {
    fetchEvent(1, false);
  }, [filters.format]);
  useEffect(()=>{
  if (inView && pagination.hasMore && !isLoading && !isMoreLoading) {
    let timer = setTimeout(() => {
      fetchEvent(pagination.page + 1, true);
    }, 200);

    return () => clearTimeout(timer);
  }
  },[inView])
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111] tracking-tight">
          Explore Curated Gatherings
        </h1>
        <p className="text-sm text-stone-600">
          Discover summits, masterclasses, acoustic shows, and retreats across
          India
        </p>
      </div>

      {/* Filter and Search Bar */}
    <EventFilterBar/>
     

      {/* Results Header with Active Filter Tags */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone-500 pt-2 border-b border-[#EBE8DF] pb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span>
            Showing <strong className="text-stone-800">{events.length}</strong> events of {pagination.total}
          </span>

          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-50 text-[#C2410C] border border-orange-200">
            <span>📍</span>
            <span>City: Bengaluru</span>
            <button
              type="button"
              className="hover:text-rose-700 ml-0.5 cursor-pointer"
              aria-label="Remove city filter"
            >
              ✕
            </button>
          </span>

          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-stone-100 text-stone-800 border border-stone-200">
            <span className="text-[#E65100]">🏷️</span>
            <span>Category: Technology & AI</span>
            <button
              type="button"
              className="hover:text-rose-700 ml-0.5 cursor-pointer"
              aria-label="Remove category filter"
            >
              ✕
            </button>
          </span>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {events.map((e) => (
            <EventCard key={e.id || e._id} event={e} />
          ))}
        </div>
      )}

      <div ref={observer} className="py-6 flex justify-center ">
        {pagination.hasMore && (
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span className="w-4 h-4 border-2 border-[#E65100] border-t-transparent rounded-full animate-spin" />
            <span>Unfolding more community gatherings...</span>
          </div>
        )}
      </div>
    </div>
  );
}

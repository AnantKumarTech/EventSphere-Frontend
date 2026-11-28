import EventCard from "@/component/EventCard";
import Skeleton from "@/component/Skeleton";
import api from "@/lib/axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useInView } from "react-intersection-observer";
import EventFilterBar from "@/component/EventFilterBar";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router";
import { setFormat, setIsPaid } from "@/store/slices/filterSlice";

export default function ExplorePage() {
  // Request tracking
  const activeRequestId = useRef(0);

  // URL parameters
  const [searchParams] = useSearchParams();

  // Redux filters
  const filters = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  // View observer
  const { ref: observer, inView } = useInView();

  // Events storage
  const [events, setEvent] = useState([]);

  // Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [isMoreLoading, setIsMoreLoading] = useState(false);

  // Pagination data
  const [pagination, setPagination] = useState({
    page: 1,
    total: 0,
    hasMore: false,
  });

  // Fetch events
  async function fetchEvent(page = 1, append) {
    // Request identification
    const thisRequestId = ++activeRequestId.current;

    if (page === 1) {
      setIsLoading(true);
    } else {
      setIsMoreLoading(true);
    }

    const params = new URLSearchParams();
    params.set("page", String(page));

    if (filters.format) {
      params.set("format", filters.format);
    }

    if (filters.isPaid !== "") {
      params.set("isPaid", String(filters.isPaid));
    }

    try {
      const { data: event, pagination } = await api.get(
        `/api/events?${params.toString()}`,
      );

    
      if (thisRequestId !== activeRequestId.current) {
        return;
      }

      
      if (append) {
        setEvent((prev) => [...prev, ...event]);
      } else {
        setEvent(event);
      }

      setPagination(pagination);
    } catch (error) {
   
      if (thisRequestId === activeRequestId.current) {
        toast.error(error?.response?.data?.message || "Unable to load events.");
      }
    } finally {
  
      if (thisRequestId === activeRequestId.current) {
        setIsLoading(false);
        setIsMoreLoading(false);
      }
    }
  }

  // URL synchronization
  useEffect(() => {
    // URL filter values
    const urlFormat = searchParams.get("format");
    const urlIsPaid = searchParams.get("isPaid");

    // Format synchronization
    if (urlFormat) {
      dispatch(setFormat(urlFormat));
    } else {
      dispatch(setFormat(""));
    }

    // Pricing synchronization
    if (urlIsPaid !== "" && urlIsPaid !== null) {
      console.log(urlIsPaid);
      dispatch(setIsPaid(urlIsPaid === "true" ? true : false));
    } else {
      dispatch(setIsPaid(""));
    }
  }, [dispatch, searchParams]);

  // Filter fetching
  useEffect(() => {
    fetchEvent(1, false);
  }, [filters.format, filters.isPaid]);

  // Infinite scrolling
  useEffect(() => {
    if (inView && pagination.hasMore && !isLoading && !isMoreLoading) {
      // Request delay
      let timer = setTimeout(() => {
        fetchEvent(pagination.page + 1, true);
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [inView]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      {/* Page heading */}
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111] tracking-tight">
          Explore Curated Gatherings
        </h1>
        <p className="text-sm text-stone-600">
          Discover summits, masterclasses, acoustic shows, and retreats across
          India
        </p>
      </div>

      {/* Event filters */}
      <EventFilterBar />

      {/* Results summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone-500 pt-2 border-b border-[#EBE8DF] pb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span>
            Showing <strong className="text-stone-800">{events.length}</strong>{" "}
            events of {pagination.total}
          </span>

          {/* City filter */}
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

          {/* Category filter */}
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

      {/* Events display */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Skeleton cards */}
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Event mapping */}
          {events.map((e) => (
            <EventCard key={e.id || e._id} event={e} />
          ))}
        </div>
      )}

      {/* Scroll observer */}
      <div ref={observer} className="py-6 flex justify-center ">
        {/* Loading indicator */}
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

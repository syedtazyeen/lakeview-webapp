import { getBookings } from "@/api/bookings";
import { useApi } from "@/hooks/use-api";
import useBookingStore from "@/store/bookings";
import { useEffect } from "react";

export const useBookingsLoader = (call: boolean = true) => {
  const { data, isLoading, error } = useApi(getBookings, call);
  const { bookings, setBookings } = useBookingStore();

  useEffect(() => {
    if (data) {
      setBookings(data.data);
    }
  }, [data, setBookings]);

  return { bookings, isLoading, error };
};

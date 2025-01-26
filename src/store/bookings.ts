import { create } from "zustand";

interface BookingStore {
  bookings: Booking[];
  setBookings: (val: Booking[]) => void;
  addBooking: (val: Booking) => void;
  reset: () => void;
}

const useBookingStore = create<BookingStore>((set) => ({
  bookings: [],
  setBookings: (bookings) => set({ bookings }),
  addBooking: (booking) =>
    set((state) => ({ bookings: [...state.bookings, booking] })),
  reset: () => set({ bookings: [] }),
}));

export default useBookingStore;

type BookingStatus = "CONFIRMED" | "CANCELLED" | "CHECKED_IN" | "CHECKED_OUT";
type PaymentStatus = "PAID" | "UNPAID" | "PARTIALLY_PAID";

type Booking = {
  id: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  user: User;
  room: Room;
  bookingStatus: BookingStatus;
  paymentStatus: PaymentStatus;
  bookingConfirmationCode: number;
  checkInDate: string;
  checkOutDate: string;
  guestCount: number;
  addOns: string[];
  bookingAmount: number;
};

type BookingRequest = {
  roomClassId: string;
  checkInDate: string;
  checkOutDate: string;
  guestCount: number;
  addOns: string[];
  bookingStatus: BookingStatus;
  paymentStatus: PaymentStatus;
};

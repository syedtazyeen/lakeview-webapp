import axiosInstance from "@/lib/axios";
import { API_RESOURCES } from "@/lib/constants";

const RESOURCE = API_RESOURCES.BOOKINGS;

export async function getBookings() {
    return await axiosInstance.get<Booking[]>(`/${RESOURCE}`);
}

export async function getBookingById(bookingId: string) {
    return await axiosInstance.get<Booking>(`/${RESOURCE}/${bookingId}`);
}

export async function getBookingByConfimationCode(confirmationCode: string) {
    return await axiosInstance.get<Booking>(`/${RESOURCE}/confirmation/${confirmationCode}`);
}

export async function createBooking(payload: BookingRequest) {
    return await axiosInstance.post<Booking>(`/${RESOURCE}`, payload);
}

export async function cancelBooking(bookingId: string) {
    return await axiosInstance.put<void>(`/${RESOURCE}/cancel/${bookingId}`);
}

export async function deleteBooking(bookingId: string) {
    return await axiosInstance.delete<void>(`/${RESOURCE}/${bookingId}`);
}

import axiosInstance from "@/lib/axios";
import { API_RESOURCES } from "@/lib/constants";

const RESOURCE = API_RESOURCES.ROOM_CLASSES;

export async function getRoomClassesAvailability(
  queryParams: RoomClassesAvailabilityRequest
) {
  const params = new URLSearchParams();
  params.append("checkInDate", queryParams.checkInDate);
  params.append("checkOutDate", queryParams.checkOutDate);
  if (queryParams.roomClassId) {
    params.append("roomClassId", queryParams.roomClassId);
  }
  if (queryParams.guestCount) {
    params.append("guestCount", queryParams.guestCount.toString());
  }
  return await axiosInstance.get<RoomClass[]>(`/${RESOURCE}/findAvailability`, {
    params,
  });
}

export async function getRoomClasses() {
  return await axiosInstance.get<RoomClass[]>(`/${RESOURCE}`);
}

export async function getRoomClassById(roomClassId: string) {
  return await axiosInstance.get<RoomClass>(`/${RESOURCE}/${roomClassId}`);
}

export async function createRoomClass(payload: RoomRequest) {
  return await axiosInstance.post<RoomClass>(`/${RESOURCE}`, payload);
}

export async function updateRoomClass(
  roomClassId: string,
  payload: Partial<RoomRequest>
) {
  return await axiosInstance.put<RoomClass>(
    `/${RESOURCE}/${roomClassId}`,
    payload
  );
}

export async function deleteRoomClass(roomClassId: string) {
  return await axiosInstance.delete<void>(`/${RESOURCE}/${roomClassId}`);
}

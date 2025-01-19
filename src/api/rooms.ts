import axiosInstance from "@/lib/axios";
import { API_RESOURCES } from "@/lib/constants";

const RESOURCE = API_RESOURCES.ROOMS;

export async function getRooms() {
  return await axiosInstance.get<Room[]>(`/${RESOURCE}`);
}

export async function getRoomById(roomId: string) {
  return await axiosInstance.get<Floor>(`/${RESOURCE}/${roomId}`);
}

export async function createRoom(payload: RoomRequest) {
  return await axiosInstance.post<Room>(`/${RESOURCE}`, payload);
}

export async function updateRoom(
  roomId: string,
  payload: Partial<RoomRequest>
) {
  return await axiosInstance.put<Room>(`/${RESOURCE}/${roomId}`, payload);
}

export async function deleteRoom(roomId: string) {
  return await axiosInstance.delete<void>(`/${RESOURCE}/${roomId}`);
}

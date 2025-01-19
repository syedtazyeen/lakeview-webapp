import axiosInstance from "@/lib/axios";
import { API_RESOURCES } from "@/lib/constants";

const RESOURCE = API_RESOURCES.FLOORS;

export async function getFloors() {
  return await axiosInstance.get<Floor[]>(`/${RESOURCE}`);
}

export async function getFloorById(floorId: string) {
  return await axiosInstance.get<Floor>(`/${RESOURCE}/${floorId}`);
}

export async function createFloor(payload: FloorRequest) {
  return await axiosInstance.post<Floor>(`/${RESOURCE}`, payload);
}

export async function updateFloor(
  floorId: string,
  payload: Partial<FloorRequest>
) {
  return await axiosInstance.put<Floor>(`/${RESOURCE}/${floorId}`, payload);
}

export async function deleteFloor(floorId: string) {
  return await axiosInstance.delete<void>(`/${RESOURCE}/${floorId}`);
}

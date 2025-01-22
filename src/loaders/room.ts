import { getFloors } from "@/api/floors";
import { getRoomClasses } from "@/api/room-classes";
import { getRooms } from "@/api/rooms";
import { useApi } from "@/hooks/use-api";
import useRoomStore from "@/store/rooms";
import { useEffect } from "react";

export const useRoomsLoader = () => {
  const { data, isLoading, error } = useApi(getRooms);
  const { rooms, setRooms } = useRoomStore();

  useEffect(() => {
    if (data) {
      setRooms(data.data);
    }
  }, [data, setRooms]);

  return { rooms, isLoading, error };
};

export const useFloorsLoader = (call: boolean = true) => {
  const { data, isLoading, error } = useApi(getFloors, call);
  const { floors, setFloors } = useRoomStore();

  useEffect(() => {
    if (data) {
      setFloors(data.data);
    }
  }, [data, setFloors]);

  return { floors, isLoading, error };
};

export const useRoomClassesLoader = () => {
  const { data, isLoading, error } = useApi(getRoomClasses);
  const { categories, setCategories } = useRoomStore();

  useEffect(() => {
    if (data) {
      setCategories(data.data);
    }
  }, [data, setCategories]);

  return { categories, isLoading, error };
};

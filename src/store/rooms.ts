import { create } from "zustand";

interface RoomStore {
  categories: RoomClass[];
  setCategories: (val: RoomClass[]) => void;
  addCategory: (val: RoomClass) => void;
  removeCategory: (val: RoomClass) => void;
  floors: Floor[];
  setFloors: (val: Floor[]) => void;
  addFloor: (val: Floor) => void;
  removeFloor: (val: Floor) => void;
  reset: () => void;
}

const useRoomStore = create<RoomStore>((set) => ({
  categories: [],
  setCategories: (categories) => set({ categories }),
  addCategory: (category) =>
    set((state) => ({ categories: [...state.categories, category] })),
  removeCategory: (category) =>
    set((state) => ({
      categories: state.categories.filter((item) => item !== category),
    })),
  floors: [],
  setFloors: (floors) => set({ floors }),
  addFloor: (floor) => set((state) => ({ floors: [...state.floors, floor] })),
  removeFloor: (floor) =>
    set((state) => ({
      floors: state.floors.filter((item) => item !== floor),
    })),
  reset: () => set({ categories: [], floors: [] }),
}));

export default useRoomStore;

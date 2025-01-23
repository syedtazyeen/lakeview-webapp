type RoomStatusType = "AVAILABLE" | "MAINTENANCE" | "CLEANING";

enum RoomStatus {
  AVAILABLE = "AVAILABLE",
  MAINTENANCE = "MAINTENANCE",
  CLEANING = "CLEANING",
}

type Room = {
  id: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  floor: Floor;
  roomClass: RoomClass;
  roomNumber: string;
  roomStatus: RoomStatusType;
};

type RoomRequest = {
  floorId: string;
  roomClassId: string;
  roomNumber: string;
  roomStatus: RoomStatusType;
};

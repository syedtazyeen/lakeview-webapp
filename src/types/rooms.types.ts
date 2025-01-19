type RoomStatus = "AVAILABLE" | "MAINTENANCE" | "CLEANING";

type Room = {
  id: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  floor: Floor;
  roomClass: RoomClass;
  roomNumber: string;
  roomStatus: RoomStatus;
};

type RoomRequest = {
  floorId: string;
  roomClassId: string;
  roomNumber: string;
  roomStatus: RoomStatus;
};

type RoomClassesAvailabilityRequest = {
  checkInDate: string;
  checkOutDate: string;
  roomClassId?: string;
  guestCount?: number;
};

type RoomClassesRequest = {
  title: string;
  description: string;
  basePrice: number;
  maxGuestCount: number;
  images?: string[];
  features: string[];
  bedTypes: string[];
};

enum RoomBedType {
  SINGLE = "SINGLE",
  DOUBLE = "DOUBLE",
  QUEEN = "QUEEN",
  KING = "KING",
}

enum RoomFeature {
  WIFI = "WIFI",
  TV = "TV",
  AIR_CONDITIONER = "AIR_CONDITIONER",
  ELECTRIC_KETTLE = "ELECTRIC_KETTLE",
  HAIR_DRYER = "HAIR_DRYER",
  PRIVATE_BATHROOM = "PRIVATE_BATHROOM",
  TOWELS = "TOWELS",
  DVD_PLAYER = "DVD_PLAYER",
  FREE_WIFI = "FREE_WIFI",
  RADIO = "RADIO",
  TELEPHONE = "TELEPHONE",
  AIR_CONDITIONING = "AIR_CONDITIONING",
  ALARM_CLOCK = "ALARM_CLOCK",
  HYPOALLERGENIC = "HYPOALLERGENIC",
  LINENS = "LINENS",
  COFFEE_MAKER = "COFFEE_MAKER",
  MINI_BAR = "MINI_BAR",
  DAILY_HOUSEKEEPING = "DAILY_HOUSEKEEPING",
  CARPETING = "CARPETING",
  DESK = "DESK",
  SOFA = "SOFA",
  HIGH_CHAIR = "HIGH_CHAIR",
}

type RoomClass = {
  id: string;
  basePrice: number;
  title: string;
  description: string;
  maxGuestCount: number;
  images: string[];
  features: RoomFeature[];
  bedTypes: RoomBedType[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
};

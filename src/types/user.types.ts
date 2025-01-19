type Address = {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
};

type UserRole = "ADMIN" | "USER";

type UserGender = "MALE" | "FEMALE" | "OTHER";

type User = {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  gender: UserGender;
  phoneNumber: string;
  address: Address;
  dateOfBirth: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  version: number;
};

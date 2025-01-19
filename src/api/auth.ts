import axiosInstance from "@/lib/axios";
import { API_RESOURCES } from "@/lib/constants";

const RESOURCE = API_RESOURCES.AUTH;

export async function login(payload: LoginRequest) {
  return await axiosInstance.post<LoginResponse>(`/${RESOURCE}/login`, payload);
}

export async function signup(payload: SignupRequest) {
  return await axiosInstance.post<SignupResponse>(`/${RESOURCE}/signup`, payload);
}

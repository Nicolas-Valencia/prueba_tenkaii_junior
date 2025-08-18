import axios from "axios";
import type { User } from "../types/User.ts";

const API_URL = "http://localhost:3000/users";

export const getUsers = async (): Promise<User[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};

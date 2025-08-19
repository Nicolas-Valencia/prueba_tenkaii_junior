import axios from "axios";
import type { User } from "../types/User.ts";

// URL base de la API del backend para usuarios
const API_URL = "http://localhost:3000/users";

// Obtener todos los usuarios
// Realiza una solicitud GET a la API y retorna los usuarios
export const getUsers = async (): Promise<User[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};

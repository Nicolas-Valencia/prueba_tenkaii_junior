import axios from "axios";
import type { Task } from "../types/Task";

// URL base de la API del backend
const API_URL = "http://localhost:3000/tasks";

// Obtener todas las tareas
// Realiza una solicitud GET a la API y retorna las tareas
export const getTasks = async (): Promise<Task[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};

// Crear nueva tarea
// Envía los datos de la tarea al backend y retorna la tarea creada
export const createTask = async (
  task: Omit<Task, "id" | "createdAt" | "updatedAt" | "User" | "status">
) => {
  const res = await axios.post(API_URL, task);
  return res.data;
};

// Actualizar tarea
// Envía los cambios de la tarea al backend y retorna la tarea actualizada
export const updateTask = async (id: number, updates: Partial<Task>) => {
  const res = await axios.patch(`${API_URL}/${id}`, updates);
  return res.data;
};

// Eliminar tarea
// Envía una solicitud DELETE al backend para eliminar la tarea por ID
export const deleteTask = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};

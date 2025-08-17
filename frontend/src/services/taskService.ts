import axios from "axios";
import type { Task } from "../types/Task";

const API_URL = "http://localhost:3000/tasks"; // tu backend NestJS

// Obtener todas las tareas
export const getTasks = async (): Promise<Task[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};

// Crear nueva tarea
export const createTask = async (
  task: Omit<Task, "id" | "createdAt" | "updatedAt">
) => {
  const res = await axios.post(API_URL, task);
  return res.data;
};

// Actualizar tarea
export const updateTask = async (id: number, updates: Partial<Task>) => {
  const res = await axios.patch(`${API_URL}/${id}`, updates);
  return res.data;
};

// Eliminar tarea (opcional)
export const deleteTask = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};

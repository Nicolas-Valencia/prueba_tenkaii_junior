import type { User } from "./User";

export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt: string;
  userId: number;
  user?: User;
}

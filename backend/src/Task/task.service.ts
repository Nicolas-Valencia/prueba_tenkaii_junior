import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { PrismaService } from '../Prisma/prisma.service';
import { CreateTaskDto } from './create-task.dto';
import { UpdateTaskDto } from './update-task.dto';

// Servicio para manejar las operaciones de tareas
// Utiliza PrismaService para interactuar con la base de datos
@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  // Obtiene todas las tareas
  // Incluye el usuario asociado a cada tarea
  // Retorna una lista de tareas
  async getAllTasks(): Promise<Task[]> {
    return this.prisma.task.findMany({ include: { user: true } });
  }

  // Obtiene una tarea por ID
  // Retorna la tarea o null si no existe
  async getTaskById(id: number): Promise<Task | null> {
    return this.prisma.task.findUnique({
      where: { id },
    });
  }

  // Crea una nueva tarea
  // Utiliza CreateTaskDto para validar los datos de entrada
  // Retorna la tarea creada
  async createTask(dto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description,
        userId: dto.userId,
      },
    });
  }

  // Actualiza una tarea existente
  // Utiliza UpdateTaskDto para validar los datos de entrada
  // Retorna la tarea actualizada
  async updateTask(id: number, data: UpdateTaskDto): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data,
    });
  }

  // Cambia el estado de una tarea
  // Retorna la tarea actualizada
  async changeStatus(id: number, status: string): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data: { status },
    });
  }

  // Elimina una tarea por ID
  // Retorna la tarea eliminada
  async deleteTask(id: number): Promise<Task> {
    return this.prisma.task.delete({
      where: { id },
    });
  }
}

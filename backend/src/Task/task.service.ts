import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { PrismaService } from 'src/Prisma/prisma.service'; 
import { CreateTaskDto } from './create-task.dto';
import { UpdateTaskDto } from './update-task.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async getAllTasks(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

    async getTaskById(id: number): Promise<Task | null> {
        return this.prisma.task.findUnique({
        where: { id },
        });
        
    }

  async createTask(data: CreateTaskDto): Promise<Task> {
    return this.prisma.task.create({
      data
    });
  }

  async updateTask(id: number, data: UpdateTaskDto): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data,
    });
  }

  async changeStatus(id: number, status: string): Promise<Task> {
        return this.prisma.task.update({
        where: { id },
        data: { status },
        });
    }

  async deleteTask(id: number): Promise<Task> {
    return this.prisma.task.delete({
      where: { id },
    });
  }

}

import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException,} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './create-task.dto';
import { UpdateTaskDto } from './update-task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAllTasks() {
    return this.taskService.getAllTasks();
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string) {
    const task = await this.taskService.getTaskById(Number(id));

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  @Post()
  async createTask(@Body() data: CreateTaskDto) {
    return this.taskService.createTask(data);
  }

  @Put(':id')
  async updateTask(id: number, data: UpdateTaskDto) {
    return this.taskService.updateTask(id, data);
  }

  @Put(':id/status')
  async changeStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.taskService.changeStatus(Number(id), status);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    try {
        return await this.taskService.deleteTask(Number(id));
    } catch (error) {
        throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }
}

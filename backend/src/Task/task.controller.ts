import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
  BadRequestException,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './create-task.dto';
import { UpdateTaskDto } from './update-task.dto';

// Controlador para manejar las tareas
@Controller('tasks') // Ruta base para las tareas
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // Métodos para manejar las tareas

  // Obtiene todas las tareas
  // Retorna una lista de tareas
  @Get()
  async getAllTasks() {
    const tasks = await this.taskService.getAllTasks();

    // Verifica si hay tareas
    if (!tasks || tasks.length === 0) {
      throw new NotFoundException('No tasks found'); // Lanza una excepción si no hay tareas
    }

    return tasks;
  }

  // Obtiene una tarea por ID
  // Utiliza ParseIntPipe para validar que el ID es un número
  @Get(':id')
  async getTaskById(@Param('id') id: string) {
    const task = await this.taskService.getTaskById(Number(id));

    // Verifica si la tarea existe
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`); // Lanza una excepción si la tarea no existe
    }

    return task;
  }

  // Crea una nueva tarea
  // Utiliza CreateTaskDto para validar los datos de entrada
  // Atributos requeridos: title, description, userId
  @Post()
  async createTask(@Body() data: CreateTaskDto) {
    return this.taskService.createTask(data);
  }

  // Actualiza una tarea existente
  // Utiliza UpdateTaskDto para validar los datos de entrada
  @Patch(':id')
  async updateTask(
    @Param('id', ParseIntPipe) id: string,
    @Body() dto: UpdateTaskDto,
  ) {
    return this.taskService.updateTask(Number(id), dto);
  }

  // Cambia el estado de una tarea
  @Put(':id/status')
  async changeStatus(@Param('id') id: string, @Body('status') status: string) {
    if (!status) {
      throw new NotFoundException('Status is required');
    }

    const validStatuses = [
      'Creada',
      'En Progreso',
      'Bloqueada',
      'Finalizada',
      'Cancelada',
    ];

    // Verifica si el estado es válido
    if (!validStatuses.includes(status)) {
      throw new NotFoundException(`Invalid status: ${status}`); // Lanza una excepción si el estado no es válido
    }

    return this.taskService.changeStatus(Number(id), status);
  }

  // Elimina una tarea por ID
  // Utiliza ParseIntPipe para validar que el ID es un número
  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    // Verifica si el ID es válido para eliminar
    try {
      return await this.taskService.deleteTask(Number(id));
    } catch (error) {
      throw new NotFoundException(`Task with ID ${id} not found`); // Lanza una excepción si la tarea no existe
    }
  }
}

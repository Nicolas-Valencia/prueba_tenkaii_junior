import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsIn, IsOptional, IsString } from 'class-validator';

// DTO para actualizar una tarea
// Hereda de CreateTaskDto para reutilizar la validación de los campos comunes
export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  // Atributos opcionales para actualizar una tarea
  // Utiliza IsOptional para permitir que estos campos no sean obligatorios
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  assignedTo?: string;

  @IsOptional()
  @IsIn(['Creada', 'En Progreso', 'Bloqueada', 'Finalizada', 'Cancelada'])
  status?: string;
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsIn, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsOptional() @IsString()
  title?: string;

  @IsOptional() @IsString()
  description?: string;

  @IsOptional() @IsString()
  assignedTo?: string;

  
  @IsOptional()
  @IsIn(['Creada', 'En Progreso', 'Bloqueada', 'Finalizada', 'Cancelada'])
  status?: string;
}

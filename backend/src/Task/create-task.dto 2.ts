import { IsString, IsOptional, IsIn } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsIn(["Creada", "En Progreso", "Bloqueada", "Finalizada", "Cancelada"])
  status?: string = "Creada"; 

  @IsString()
  assignedTo: string;
}

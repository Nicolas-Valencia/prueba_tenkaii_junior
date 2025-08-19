import { IsNotEmpty, IsInt } from 'class-validator';

// DTO para crear una tarea
export class CreateTaskDto {
  // Atributos requeridos
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsInt()
  userId: number; // referencia a User
}

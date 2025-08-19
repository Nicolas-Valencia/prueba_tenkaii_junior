import { IsIn } from 'class-validator';

// DTO para cambiar el estado de una tarea
export class ChangeStatusDto {
  @IsIn(['Creada', 'En Progreso', 'Bloqueada', 'Finalizada', 'Cancelada'])
  completed: string;
}

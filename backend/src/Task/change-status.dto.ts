import { IsIn } from 'class-validator';

export class ChangeStatusDto {
  @IsIn(["Creada", "En Progreso", "Bloqueada", "Finalizada", "Cancelada"])
  completed: string;
}

import { IsIn } from 'class-validator';

export class ChangeStatusDto {
  @IsIn(["Created", "In Progress", "Blocked", "Finished", "Cancelled"])
  completed: string;
}

import { IsString, IsOptional, IsIn } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsIn(["Created", "In Progress", "Blocked", "Finished", "Cancelled"])
  status?: string = "Created"; // default

  @IsString()
  assignedTo: string;
}

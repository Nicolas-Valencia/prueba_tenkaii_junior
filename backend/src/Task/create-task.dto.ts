import { IsNotEmpty, IsInt } from "class-validator";

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsInt()
  userId: number;  // 👈 referencia a User
}

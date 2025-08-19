import { IsEmail, IsNotEmpty } from 'class-validator';

// DTO para crear un usuario
// Utiliza IsNotEmpty para validar que el nombre no esté vacío
// Utiliza IsEmail para validar que el email sea correcto
export class CreateUserDto {
  @IsNotEmpty({ message: 'El nombre no debe estar vacío' })
  name: string;

  @IsEmail({}, { message: 'El email debe ser válido' })
  email: string;
}

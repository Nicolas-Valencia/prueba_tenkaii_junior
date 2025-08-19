import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';

// Controlador para manejar las operaciones de usuario
// Utiliza UserService para interactuar con la base de datos
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Métodos para manejar los usuarios

  // Crea un nuevo usuario
  // Utiliza CreateUserDto para validar los datos de entrada
  // Verifica que el email no esté registrado antes de crear el usuario
  // Retorna el usuario creado
  @Post()
  async createUser(@Body() dto: CreateUserDto) {
    const users = await this.userService.getAllUsers();
    for (const i in users) {
      const existing = users[i].email == dto.email;
      if (existing) {
        throw new BadRequestException('El email ya está registrado'); // Lanza una excepción si el email ya está registrado
      }
    }
    return this.userService.createUser(dto);
  }

  // Obtiene todos los usuarios
  // Retorna una lista de usuarios
  @Get()
  async getAllUsers() {
    const users = await this.userService.getAllUsers();
    if (!users || users.length === 0) {
      throw new NotFoundException('No users found'); // Lanza una excepción si no hay usuarios
    }
    return this.userService.getAllUsers();
  }

  // Obtiene un usuario por ID
  // Utiliza ParseIntPipe para validar que el ID es un número
  // Retorna el usuario o lanza una excepción si no existe
  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(+id);
  }

  // Actualiza un usuario por ID
  // Utiliza UpdateUserDto para validar los datos de entrada
  // Retorna el usuario actualizado
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.updateUser(+id, dto);
  }

  // Elimina un usuario por ID
  // Retorna el usuario eliminado
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.deleteUser(+id);
  }
}

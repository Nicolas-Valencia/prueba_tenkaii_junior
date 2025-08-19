import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../Prisma/prisma.service';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';

// Servicio para manejar las operaciones de usuario
// Utiliza PrismaService para interactuar con la base de datos
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // Crea un nuevo usuario
  // Verifica que el email no esté registrado antes de crear el usuario
  // Retorna el usuario creado
  async createUser(dto: CreateUserDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existing) {
      throw new BadRequestException('Email ya está registrado'); // Lanza una excepción si el email ya está registrado
    }

    return this.prisma.user.create({ data: dto });
  }

  // Obtiene un usuario por ID
  // Retorna el usuario o lanza una excepción si no existe
  async getAllUsers() {
    return this.prisma.user.findMany({
      include: { tasks: true },
    });
  }

  // Obtiene un usuario por ID
  // Utiliza ParseIntPipe para validar que el ID es un número
  // Retorna el usuario
  async getUserById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { tasks: true },
    });
    if (!user) throw new NotFoundException(`User ${id} not found`); // Lanza una excepción si el usuario no existe
    return user;
  }

  // Actualiza un usuario por ID
  // Utiliza UpdateUserDto para validar los datos de entrada
  // Retorna el usuario actualizado
  async updateUser(id: number, dto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: dto,
    });
  }

  // Elimina un usuario por ID
  // Retorna el usuario eliminado
  // Lanza una excepción si el usuario no existe
  async deleteUser(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}

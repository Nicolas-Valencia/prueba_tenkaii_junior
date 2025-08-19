import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../Prisma/prisma.service';

// Pruebas unitarias para UserService
// Utiliza PrismaService para simular interacciones con la base de datos
describe('UserService', () => {
  let service: UserService;

  // Mock de PrismaService para simular la base de datos
  // Permite verificar que las funciones de UserService interactúan correctamente con PrismaService
  const mockPrisma = {
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  // Configuración del módulo de pruebas
  // Antes de cada prueba, se crea un módulo de pruebas con UserService y PrismaService
  // Esto permite aislar las pruebas y evitar dependencias externas
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  // Pruebas unitarias para las funciones de UserService
  // Verifica que se pueda crear un usuario, obtener un usuario por ID y evitar duplic
  it('debería crear un usuario', async () => {
    const dto = { name: 'Nicolás', email: 'nico@example.com' };
    mockPrisma.user.create.mockResolvedValue({ id: 1, ...dto });

    const result = await service.createUser(dto);
    expect(result).toEqual({ id: 1, ...dto });
    expect(mockPrisma.user.create).toHaveBeenCalled();
  });

  // Verifica que se pueda obtener un usuario por ID
  // Utiliza un mock para simular la respuesta de la base de datos
  it('debería evitar duplicados de email', async () => {
    const dto = { name: 'Nicolás', email: 'nico@example.com' };
    mockPrisma.user.findUnique.mockResolvedValue(dto);

    await expect(service.createUser(dto)).rejects.toThrow();
  });
});

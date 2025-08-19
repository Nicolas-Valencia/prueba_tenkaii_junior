import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../Prisma/prisma.service';

describe('UserService', () => {
  let service: UserService;

  const mockPrisma = {
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('debería crear un usuario', async () => {
    const dto = { name: 'Nicolás', email: 'nico@example.com' };
    mockPrisma.user.create.mockResolvedValue({ id: 1, ...dto });

    const result = await service.createUser(dto);
    expect(result).toEqual({ id: 1, ...dto });
    expect(mockPrisma.user.create).toHaveBeenCalled();
  });

  it('debería evitar duplicados de email', async () => {
    const dto = { name: 'Nicolás', email: 'nico@example.com' };
    mockPrisma.user.findUnique.mockResolvedValue(dto);

    await expect(service.createUser(dto)).rejects.toThrow();
  });
});

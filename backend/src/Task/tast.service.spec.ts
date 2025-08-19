import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { PrismaService } from '../Prisma/prisma.service';

describe('TaskService', () => {
  let service: TaskService;

  const mockPrisma = {
    task: {
      create: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('debería crear una tarea', async () => {
    const dto = { title: 'Test', description: 'Desc', userId: 1, status: 'Creada' };
    mockPrisma.task.create.mockResolvedValue({ id: 1, ...dto });

    const result = await service.createTask(dto);
    expect(result).toEqual({ id: 1, ...dto });
    expect(mockPrisma.task.create).toHaveBeenCalled();
  });

  it('debería listar tareas', async () => {
    mockPrisma.task.findMany.mockResolvedValue([{ id: 1, title: 'Test', status: 'Creada' }]);

    const result = await service.getAllTasks();
    expect(result).toHaveLength(1);
    expect(mockPrisma.task.findMany).toHaveBeenCalled();
  });

  it('debería actualizar el estado de una tarea', async () => {
    mockPrisma.task.update.mockResolvedValue({ id: 1, status: 'En Progreso' });

    const result = await service.updateTask(1, { status: 'En Progreso' });
    expect(result.status).toBe('En Progreso');
    expect(mockPrisma.task.update).toHaveBeenCalled();
  });
});

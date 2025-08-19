import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { PrismaService } from '../Prisma/prisma.service';

// Pruebas unitarias para TaskService
// Utiliza PrismaService para simular interacciones con la base de datos
describe('TaskService', () => {
  let service: TaskService;

  const mockPrisma = {
    task: {
      create: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
    },
  };

  // Configuración del módulo de pruebas
  // Antes de cada prueba, se crea un módulo de pruebas con TaskService y PrismaService simulados
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  // Pruebas unitarias para las funciones de TaskService
  // Verifica que se pueda crear una tarea, listar tareas y actualizar el estado de una tarea
  it('debería crear una tarea', async () => {
    const dto = {
      title: 'Test',
      description: 'Desc',
      userId: 1,
      status: 'Creada',
    };
    mockPrisma.task.create.mockResolvedValue({ id: 1, ...dto });

    const result = await service.createTask(dto);
    expect(result).toEqual({ id: 1, ...dto });
    expect(mockPrisma.task.create).toHaveBeenCalled();
  });

  // Verifica que se pueda listar todas las tareas
  // Utiliza un mock para simular la respuesta de la base de datos
  it('debería listar tareas', async () => {
    mockPrisma.task.findMany.mockResolvedValue([
      { id: 1, title: 'Test', status: 'Creada' },
    ]);

    const result = await service.getAllTasks();
    expect(result).toHaveLength(1);
    expect(mockPrisma.task.findMany).toHaveBeenCalled();
  });

  // Verifica que se pueda actualizar el estado de una tarea
  // Utiliza un mock para simular la actualización en la base de datos
  it('debería actualizar el estado de una tarea', async () => {
    mockPrisma.task.update.mockResolvedValue({ id: 1, status: 'En Progreso' });

    const result = await service.updateTask(1, { status: 'En Progreso' });
    expect(result.status).toBe('En Progreso');
    expect(mockPrisma.task.update).toHaveBeenCalled();
  });
});

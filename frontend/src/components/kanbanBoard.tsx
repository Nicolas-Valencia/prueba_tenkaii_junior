import { DndContext, useDroppable } from "@dnd-kit/core";
import { useState, useEffect } from "react";
import { deleteTask, getTasks, updateTask } from "../services/taskService";
import type { Task } from "../types/Task";
import TaskCard from "./taskCard"; // 👈 ahora usamos el TaskCard unificado
import "../styles/kanban.css";
import ModalCreateTask from "./modalCreateTask";
import CreateTaskForm from "./createTaskForm";

// Define las columnas del tablero Kanban
// Estas son las categorías de estado de las tareas
const columns = ["Creada", "En Progreso", "Bloqueada", "Finalizada", "Cancelada"];

// --- Column (droppable) ---
// Componente para una columna del tablero Kanban
function Column({ id, children }: { id: string; children: React.ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className="kanban-column"
      style={{ backgroundColor: isOver ? "#e2e8f0" : "white" }}
    >
      <h3 className="font-bold mb-2">{id}</h3>
      {children}
    </div>
  );
}

// --- KanbanBoard principal ---
export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Cargar tareas desde el backend
  // Maneja la lógica de carga de tareas y actualiza el estado
  // Utiliza un efecto para cargar las tareas al montar el componente
  const loadTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };


  // Cargar tareas desde backend
  useEffect(() => {
    getTasks()
      .then((data) => {
        console.log("Tasks desde backend:", data);
        setTasks(data);
      })
      .catch(console.error);
  }, []);

  // Mover tarea entre columnas
  const handleDragEnd = async (event: any) => {
    const { over, active } = event;
    if (over) {
      const taskId = parseInt(active.id);
      const newStatus = over.id;

      // actualizar en el estado
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
      );

      // actualizar en el backend
      try {
        await updateTask(taskId, { status: newStatus });
      } catch (err) {
        console.error("Error actualizando tarea en backend", err);
      }
    }
  };

  // Maneja la eliminación de una tarea
  // Llama al servicio de eliminación y actualiza el estado local
  // Muestra un mensaje de error si falla
  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error('Error eliminando tarea', err);
      alert('No se pudo eliminar la tarea (revisa la consola).');
    }
  };

  // Renderiza el tablero Kanban
  return (
    <>
      {/* Botón */}
      <div className="">
        <button
          onClick={() => setIsModalOpen(true)}
          className=""
        >
          Añadir tarea
        </button>
      </div>

      {/* Modal con formulario */}
      <ModalCreateTask
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}>

        <CreateTaskForm
          onTaskCreated={() => {
            setIsModalOpen(false);
            loadTasks(); // refrescar después de crear
          }}
        />
      </ModalCreateTask>

      {/* Tablero */}
      <DndContext onDragEnd={handleDragEnd}>
        <div className="kanban-board">
          {columns.map((col) => (
            <Column key={col} id={col}>
              {tasks.filter((t) => t.status === col).map((task) => (
                <TaskCard key={task.id} task={task} onDelete={handleDeleteTask} />
              ))}
            </Column>
          ))}
        </div>
      </DndContext>
    </>
  );
}

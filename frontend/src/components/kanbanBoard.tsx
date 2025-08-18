import { DndContext, useDroppable } from "@dnd-kit/core";
import { useState, useEffect } from "react";
import { getTasks, updateTask } from "../services/taskService";
import type { Task } from "../types/Task";
import TaskCard from "./taskCard"; // 👈 ahora usamos el TaskCard unificado
import "../styles/kanban.css";

const columns = ["Creada", "En Progreso", "Bloqueada", "Finalizada", "Cancelada"];

// --- Column (droppable) ---
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

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="kanban-board">
        {columns.map((col) => (
          <Column key={col} id={col}>
            {tasks
              .filter((t) => t.status === col)
              .map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
          </Column>
        ))}
      </div>
    </DndContext>
  );
}

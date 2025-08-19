import React, { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import type { Task } from "../types/Task";

interface TaskCardProps {
    task: Task;
    onDelete: (id: number) => void;
}

// Componente para mostrar una tarjeta de tarea
// Permite arrastrar y soltar tareas entre columnas
// También permite expandir para ver más detalles de la tarea
// Incluye un botón para eliminar la tarea
const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete }) => {
    const [expanded, setExpanded] = useState(false);

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task.id.toString(),
    });

    // Maneja la eliminación de la tarea
    // Muestra un mensaje de confirmación antes de eliminar
    const handleDelete = () => {
        if (window.confirm("¿Seguro que deseas eliminar esta tarea?")) {
            onDelete(task.id);
        }
    };

    const style = {
        transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : undefined,
    };

    // Renderiza la tarjeta de tarea
    // Incluye título, descripción, estado y responsable
    // Permite expandir para ver más detalles
    return (
        <div
            ref={setNodeRef}
            style={style}
            className="kanban-task"
        >
            <button
                onClick={handleDelete}
                className="ondelete-button"
            >
                ×
            </button>
            {/* 👇 solo el título es el "handle" para arrastrar */}
            <div
                {...listeners}
                {...attributes}
            >
                <h3
                    className="font-semibold text-lg cursor-grab"

                >
                    {task.title}
                </h3>

                <p className=""
                >{task.user?.name}</p>

                {expanded && (
                    <div className="">
                        <p><strong>Descripción completa:</strong> {task.description}</p>
                        <p><strong>Estado:</strong> {task.status}</p>
                        <p><strong>Responsable:</strong> {task.user?.name}</p>
                        <p><strong>Creada:</strong> {new Date(task.createdAt).toLocaleString()}</p>
                    </div>
                )}
            </div>
            <button
                className="button_expand"
                onClick={() => setExpanded(!expanded)}
            >
                {expanded ? "Ver menos..." : "Ver más..."}
            </button>
        </div>
    );
};

export default TaskCard;

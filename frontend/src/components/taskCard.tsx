import React, { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import type { Task } from "../types/Task";

interface TaskCardProps {
    task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
    const [expanded, setExpanded] = useState(false);

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task.id.toString(),
    });

    const style = {
        transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : undefined,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="kanban-task"
        >
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
                >{task.assignedTo}</p>

                {expanded && (
                    <div className="">
                        <p><strong>Descripción completa:</strong> {task.description}</p>
                        <p><strong>Estado:</strong> {task.status}</p>
                        <p><strong>Responsable:</strong> {task.assignedTo}</p>
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

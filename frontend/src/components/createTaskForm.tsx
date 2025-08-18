import { useEffect, useState } from "react";
import { createTask } from "../services/taskService";
import { getUsers } from "../services/userService";
import type { User } from "../types/User";
import "../styles/createTask.css"; 

export default function CreateTaskForm({ onTaskCreated }: { onTaskCreated: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers().then(setUsers).catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !userId) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      await createTask({ title, description, userId });
      alert("Tarea creada exitosamente");
      setTitle("");
      setDescription("");
      setUserId(null);
      onTaskCreated(); // refrescar lista de tasks en el tablero
    } catch (error) {
      console.error(error);
      alert("Error creando la tarea");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-create-task">
      <h2 className="">Crear nueva tarea</h2>

      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input-form"
      />

      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="textarea-form"
      />

      <select
        value={userId ?? ""}
        onChange={(e) => setUserId(Number(e.target.value))}
        className="select-form"
      >
        <option value="">Seleccionar responsable</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name} ({user.email})
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Crear
      </button>
    </form>
  );
}

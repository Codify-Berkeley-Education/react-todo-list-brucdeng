import { useState } from "react";
import { useTodo } from "../providers/TodoContext.tsx";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const [newTaskName, setNewTaskName] = useState("");
  const [newDeadline, setNewDeadline] = useState<number | "">("");
  const { tasks, addTask } = useTodo();

  function handleAddTask() {
    if (!newTaskName.trim()) return;
    addTask({
      taskName: newTaskName,
      deadline: newDeadline === "" ? undefined : newDeadline,
    });
    setNewTaskName("");
    setNewDeadline("");
  }

  return (
    <div>
      <h2>Add a Task</h2>

      <form>
        <input
          type="text"
          placeholder="Enter task name"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Days until deadline"
          value={newDeadline}
          onChange={(e) =>
            setNewDeadline(e.target.value === "" ? "" : Number(e.target.value))
          }
        />

        <button type="button" onClick={handleAddTask}>
          Add Task
        </button>
      </form>

      <div>
        {tasks.map((task) => (
          <TodoItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
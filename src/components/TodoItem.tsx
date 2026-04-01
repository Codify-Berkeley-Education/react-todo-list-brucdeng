import { useTodo } from "../providers/TodoContext.tsx";
import type { Task } from "../types/taskTypes.ts";

type TodoItemProps = {
  task: Task;
};

export default function TodoItem({ task }: TodoItemProps) {
  const { toggleCompleteTask, deleteTask } = useTodo();

  return (
    <div>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleCompleteTask(task.id)}
      />

      <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
        {task.taskName}
      </span>

      {task.deadline !== undefined && (
        <span> — Due in {task.deadline} days</span>
      )}

      <button type="button" onClick={() => deleteTask(task.id)}>
        Delete
      </button>
    </div>
  );
}
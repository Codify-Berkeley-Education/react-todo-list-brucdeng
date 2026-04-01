export type Task = {
    id: string;
    taskName: string;
    deadline?: number;
    completed: boolean;
}
export type TodoItemProps = {
  task: Task;
  handleCompleteTask: (taskNameToComplete: string) => void;
  handleDeleteTask: (taskNameToDelete: string) => void;
};

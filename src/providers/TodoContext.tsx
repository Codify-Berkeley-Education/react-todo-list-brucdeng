import {
	type FC,
	createContext,
	useState,
	useContext,
	type ReactNode,
	useEffect,
} from "react";
import { v4 as uuid } from "uuid";
import type { Task } from "../types/taskTypes.ts";

type TodoContextType = {
  tasks: Task[]; 
  addTask: (task: Omit<Task, "id" | "completed">) => void;
  deleteTask: (id: string) => void;
  toggleCompleteTask: (id: string) => void;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [tasks, setTasks] = useState<Task[]>(() => {
		const stored = localStorage.getItem("tasks");
		return stored ? (JSON.parse(stored) as Task[]) : [];
	});

	useEffect(() => {
		localStorage.setItem("tasks", JSON.stringify(tasks));
	}, [tasks]);

	function addTask(task: Omit<Task, "id" | "completed">) {
		const newTask: Task = {
			id: uuid(),
			completed: false,
			...task,
		};
		setTasks([...tasks, newTask]);
	}

	function toggleCompleteTask(id: string) {
		setTasks(
			tasks.map((task) =>
				task.id === id ? { ...task, completed: !task.completed } : task
			)
		);
	}

	function deleteTask(id: string) {
		setTasks(tasks.filter((task) => task.id !== id));
	}

	const value: TodoContextType = {
		tasks,
		addTask,
		deleteTask,
		toggleCompleteTask,
	};

	return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodo = (): TodoContextType => {
	const context = useContext(TodoContext);
	if (context === undefined) {
		throw new Error("useTodo must be used within a TodoProvider");
	}
	return context;
};
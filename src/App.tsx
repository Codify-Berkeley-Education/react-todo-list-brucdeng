import "./App.css";
import TodoList from "./components/TodoList.tsx";
import { TodoProvider } from "./providers/TodoContext.tsx";

function App() {
	return (
		<div className="App">
			<div className="App-header">
				<h1>React Todo List</h1>
				{/* Todo list without context */}
				<TodoProvider>
					<TodoList />
				</TodoProvider>
				{/* Todo list with context */}
			</div>
		</div>
	);
}

export default App;

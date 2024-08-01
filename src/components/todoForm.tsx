import TodoService from "../todoService";
import TodoType from "../todo";
import { Dispatch, SetStateAction, useState } from "react";
import "../CSS/todoForm.css";

interface PropTypes {
  setTodos: Dispatch<SetStateAction<TodoType[]>>;
}

const TodoForm: React.FC<PropTypes> = ({ setTodos }) => {
  const [newTodoText, setNewTodoText] = useState<string>("");

  const handleAddTodo = () => {
    if (newTodoText.trim() !== "") {
      const newTodo = TodoService.addTodos(newTodoText);
      setTodos((prevTodo) => [...prevTodo, newTodo]);
      setNewTodoText("");
    }
  };
  return (
    <div className="inputForm">
      <input
        type="text"
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
        autoFocus={true}
        placeholder="Add a Task"
      />
      <button onClick={handleAddTodo}>Add Task</button>
    </div>
  );
};

export default TodoForm;

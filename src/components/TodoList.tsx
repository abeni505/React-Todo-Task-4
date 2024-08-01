import { useState } from "react";
import TodoType from "../todo";
import TodoService from "../todoService";
import TodoForm from "./todoForm";

import "../CSS/todolList.css";

import { FaEdit, FaCheck } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { GiCancel } from "react-icons/gi";

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<TodoType[]>(TodoService.getTodos());
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedText, setEditedText] = useState<string>("");

  //function to handle edit todo

  const handleEditStart = (id: number, text: string) => {
    setEditingId(id);
    setEditedText(text);
  };
  const handleEditCancel = () => {
    setEditingId(null);
    setEditedText("");
  };
  const handleEditSave = (id: number) => {
    if (editedText.trim() !== "") {
      const UpdateTodo = TodoService.UpdateTodo({
        id,
        text: editedText,
        done: false,
      });

      setTodos((prevTodos) =>
        prevTodos.map((t) => (t.id === id ? UpdateTodo : t))
      );
      setEditingId(null);
      setEditedText("");
    }
  };
  //function to handle delete todo
  const handleDelete = (id: number) => {
    TodoService.DeleteTodo(id);
    setTodos((prevTodos) => prevTodos.filter((t) => t.id !== id));
  };

  return (
    <div className="todoContainer">
      <div>
        <TodoForm setTodos={setTodos} />
      </div>
      <div className="todos">
        {todos.map((todo) => (
          <div className="items" key={todo.id}>
            {editingId === todo.id ? (
              <div className="editText">
                <input
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  autoFocus={true}
                />

                <button onClick={() => handleEditSave(todo.id)}>
                  Save
                  <FaCheck />
                </button>
                <button className="cancelBtn" onClick={handleEditCancel}>
                  Cancel
                  <GiCancel />
                </button>
              </div>
            ) : (
              <div className="editBtn">
                <span>{todo.text}</span>
                <button onClick={() => handleEditStart(todo.id, todo.text)}>
                  Edit
                  <FaEdit />
                </button>
              </div>
            )}
            <button onClick={() => handleDelete(todo.id)}>
              Delete
              <RiDeleteBin5Fill />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;

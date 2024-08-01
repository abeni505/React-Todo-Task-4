import TodoType from "./todo";

const Local_Storate_Key = "todos";

const TodoService = {
  // Get Todos
  getTodos: (): TodoType[] => {
    const todoStr = localStorage.getItem(Local_Storate_Key);
    return todoStr ? JSON.parse(todoStr) : [];
    // return [
    //   {
    //     id: 1,
    //     text: "Abeni",
    //     done: false,
    //   },
    //   {
    //     id: 2,
    //     text: "Abeni2",
    //     done: false,
    //   },
    // ];
  },

  // Add Todos
  addTodos: (text: string): TodoType => {
    const todos = TodoService.getTodos();
    const newTodo: TodoType = { id: todos.length + 1, text, done: false };
    const updateTodos = [...todos, newTodo];
    localStorage.setItem(Local_Storate_Key, JSON.stringify(updateTodos));
    return newTodo;
  },

  // Updating Todos
  UpdateTodo: (tobeUpdatedTodo: TodoType): TodoType => {
    const todos = TodoService.getTodos();
    const updateTodos = todos.map((t) =>
      t.id === tobeUpdatedTodo.id ? tobeUpdatedTodo : t
    );
    localStorage.setItem(Local_Storate_Key, JSON.stringify(updateTodos));
    return tobeUpdatedTodo;
  },

  // Deleting Todos
  DeleteTodo: (id: number): void => {
    const todos = TodoService.getTodos();
    const updateTodos = todos.filter((t) => t.id !== id);
    localStorage.setItem(Local_Storate_Key, JSON.stringify(updateTodos));
  },
};

export default TodoService;

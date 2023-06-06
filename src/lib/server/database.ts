export interface ToDo {
  id: number;
  text: string;
  completed: boolean;
}

let todos: ToDo[] = [
  {
    id: Date.now(),
    text: "Let's learn how forms work",
    completed: false,
  },
];

export function getTodos(): ToDo[] {
  return [...todos];
}

export function addTodo(text: string): void {
  const newTodo: ToDo = {
    id: Date.now(),
    text,
    completed: false,
  };

  todos.unshift(newTodo);
}

export function removeTodo(id: number): void {
  todos = todos.filter((todo) => todo.id !== id);
}

export function clearTodos() {
  todos = [];
}

import {
  addTodo,
  clearTodos,
  getTodos,
  removeTodo,
} from '$lib/server/database';
import { fail, type Actions } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ depends }) => {
  const todos = getTodos();

  depends('todos');

  return { todos };
};

export const actions: Actions = {
  addTodo: async ({ request }) => {
    const formData = await request.formData();
    const todo = String(formData.get('todo'));

    if (!todo) {
      return fail(400, { todo, missing: true });
    }

    addTodo(todo);

    return { success: true };
  },

  removeTodo: async ({ request }) => {
    const formData = await request.formData();
    const todoId = Number(formData.get('id'));

    removeTodo(todoId);
  },

  clearTodos: async () => {
    clearTodos();
  },
};

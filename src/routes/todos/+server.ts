import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { addTodo, removeTodo } from '$lib/server/database';
import type { Data } from '$lib/types';

function initializeData(): Data {
  return { success: false, errors: {} };
}

export const POST: RequestHandler = async ({ request }) => {
  const formData = await request.formData();
  const todo = String(formData.get('todo'));

  const data: Data = initializeData();

  if (!todo) {
    data.errors.todo = 'required';
    return json(data, { status: 400 });
  }

  addTodo(todo);
  data.success = true;

  return json(data, { status: 201 });
};

export const DELETE: RequestHandler = async ({ request }) => {
  const formData = await request.formData();
  const todoId = Number(formData.get('id'));

  const data: Data = initializeData();

  removeTodo(todoId);
  data.success = true;

  return json(data, { status: 200 });
};

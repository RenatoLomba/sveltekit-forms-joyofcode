import { fail, type Actions, redirect } from '@sveltejs/kit';
import { loginSchema, type LoginErrorsFields } from '$lib/schemas/login';

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();

    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      const data = {
        data: Object.fromEntries(formData),
        errors: result.error.flatten().fieldErrors as LoginErrorsFields,
      };

      return fail(400, data);
    }

    throw redirect(303, '/todos');
  },
};

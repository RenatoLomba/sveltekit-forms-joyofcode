import type { z } from 'zod';
import { zfd } from 'zod-form-data';

export const loginSchema = zfd.formData({
  user: zfd.text(),
  password: zfd.text(),
});

export type LoginFields = z.infer<typeof loginSchema>;
export type LoginErrorsFields = { [key in keyof LoginFields]: string[] };

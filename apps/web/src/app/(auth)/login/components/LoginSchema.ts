import * as z from 'zod';

export const LoginSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Input the right email',
    })
    .email(),
  password: z.string({
    required_error: 'Password is required',
  }),
});

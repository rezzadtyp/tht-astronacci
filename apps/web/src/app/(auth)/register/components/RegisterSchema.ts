import * as z from 'zod';

export const RegisterSchema = z.object({
  name: z.string({ required_error: 'Name is required' }),
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

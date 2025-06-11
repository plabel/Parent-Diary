import { z } from 'zod';

export const signinSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  password: z
    .string()
    .min(12, 'Password must be at least 12 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
});

export const validateSignin = (data: unknown) => {
  const result = signinSchema.safeParse(data);
  const formErrors: Record<string, boolean> = {
    email: false,
    firstName: false,
    lastName: false,
    password: false,
  };
  if (result.success === false && result.error) {
    result.error.issues.forEach((issue) => {
      formErrors[issue.path[0] as string] = true;
    });
  }
  return {
    formErrors,
    isValid: result.success,
  };
};

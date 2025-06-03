import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  otp: z.string().optional(),
  recoveryCode: z.string().optional(),
});

/**
 * Validate a login
 * @param data - The data to validate
 * @returns The form errors and the validity of the data
 */
export const validateLogin = (data: unknown) => {
  const result = loginSchema.safeParse(data);
  const formErrors: Record<string, boolean> = {
    email: false,
    password: false,
    otp: false,
    recoveryCode: false,
  };
  if(result.success === false && result.error) {
    result.error.issues.forEach((issue) => {
      formErrors[issue.path[0] as string] = true;
    });
  }
  return {
    formErrors,
    isValid: result.success,
  };
};

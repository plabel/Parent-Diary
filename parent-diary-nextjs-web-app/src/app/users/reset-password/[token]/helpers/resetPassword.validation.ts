import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(12, "Password must be at least 12 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

/**
 * Validate a reset password
 * @param data - The data to validate
 * @returns The form errors and the validity of the data
 */
export const validateResetPassword = (data: unknown) => {
  const result = resetPasswordSchema.safeParse(data);
  const formErrors: Record<string, boolean> = {
    password: false,
    confirmPassword: false,
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

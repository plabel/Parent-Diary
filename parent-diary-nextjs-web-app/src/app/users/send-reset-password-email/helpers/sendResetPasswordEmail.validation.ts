import { z } from "zod";

export const sendResetPasswordEmailSchema = z.object({
  email: z.string().email(),
});

export const validateSendResetPasswordEmail = (data: unknown) => {
  const result = sendResetPasswordEmailSchema.safeParse(data);
  const formErrors: Record<string, boolean> = {
    email: false,
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

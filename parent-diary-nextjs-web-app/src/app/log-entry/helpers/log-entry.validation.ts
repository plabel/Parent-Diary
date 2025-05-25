import { z } from "zod";

export const logEntrySchema = z.object({
  entry: z.string().min(1),
});

export const validateLogEntry = (data: unknown) => {
  const result = logEntrySchema.safeParse(data);
  const formErrors: Record<string, boolean> = {
    entry: false,
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

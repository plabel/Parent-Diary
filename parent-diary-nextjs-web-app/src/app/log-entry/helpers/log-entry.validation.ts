import { z } from 'zod';

export const logEntrySchema = z.object({
  entry: z.string().min(1),
  familyMembers: z.array(z.string()),
});

/**
 * Validate a log entry
 * @param data - The data to validate
 * @returns The form errors and the validity of the data
 */
export const validateLogEntry = (data: unknown) => {
  const result = logEntrySchema.safeParse(data);
  const formErrors: Record<string, boolean> = {
    entry: false,
    familyMembers: false,
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

import { z } from "zod";

export const familyMemberSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  petName: z.string().min(1),
});

/**
 * Validate a family member
 * @param data - The data to validate
 * @returns The form errors and the validity of the data
 */
export const validateFamilyMember = (data: unknown) => {
  const result = familyMemberSchema.safeParse(data);
  const formErrors: Record<string, boolean> = {
    firstName: false,
    lastName: false,
    petName: false,
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

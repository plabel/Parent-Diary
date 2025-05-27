import { fetchWrapper } from "@/app/_global/helpers/fetchWrapper";
import { validateFamilyMember } from "@/app/new-family-member/helpers/family-member.validation";

export default async function updateFamilyMember(  id: number,
    formData: FormData,
    showAlert: (variant: string, message: string) => void,
    setFormErrors: (formErrors: Record<string, boolean>) => void,
    formErrorsState: Record<string, boolean>,
    setLoading: (loading: boolean) => void,
    refreshFamilyMembers: () => Promise<void>,
    handleClose: () => void
  ): Promise<void> {
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const petName = formData.get("petName");
    const payload = { firstName, lastName, petName };
    const { formErrors, isValid } = validateFamilyMember(payload);
    const updatedFormErrors = {
      ...formErrorsState,
      ...formErrors,
    };
    setFormErrors(updatedFormErrors);
    if (!isValid) {
      setLoading(false);
      return;
    }
  
    const { data, error } = await fetchWrapper<boolean>(
      `${process.env.NEXT_PUBLIC_REST_API_URL}/family-member/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include",
      }
    );
    if (data) {
      await refreshFamilyMembers();
      showAlert("success", "Family member updated successfully");
      handleClose();
    } else {
      showAlert("danger", error?.message ?? "Family member update failed");
    }
    setLoading(false);
  }
  
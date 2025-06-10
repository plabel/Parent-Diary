type UpdateFamilyMemberTestCase = {
    description: string;
    fetchWrapperMockResult: any;
    showAlertNbOfCalls: number;
    showAlertArgs: any[];
    formData: FormData;
};

export const testCases: UpdateFamilyMemberTestCase[] = [
    {
        description: "should update a family member",
        fetchWrapperMockResult: {
            data: true,
            error: null
        },
        showAlertNbOfCalls: 1,
        showAlertArgs: ["success", "Family member updated successfully"],
        formData: (() => {
            const formData = new FormData();
            formData.set("firstName", "John");
            formData.set("lastName", "Doe");
            formData.set("petName", "Buddy");
            return formData;
        })(),
    },
    {
        description: "should not update a family member, if fetchWrapper returns an error",
        fetchWrapperMockResult: {
            data: false,
            error: {
                message: "Family member update failed"
            }
        },
        showAlertNbOfCalls: 1,
        showAlertArgs: ["danger", "Family member update failed"],
        formData: (() => {
            const formData = new FormData();
            formData.set("firstName", "Bob");
            formData.set("lastName", "Doe");
            formData.set("petName", "Buddy");
            return formData;
        })(),
    },
    {
        description: "should not update a family member, if form is invalid",
        fetchWrapperMockResult: {
            data: true,
            error: null
        },
        showAlertNbOfCalls: 0,
        showAlertArgs: [],
        formData: (() => {
            const formData = new FormData();
            formData.set("petName", "Buddy");
            return formData;
        })(),
    },
]

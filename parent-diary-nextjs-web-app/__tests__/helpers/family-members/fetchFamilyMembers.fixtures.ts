type FetchFamilyMembersTestCase = {
    description: string;
    fetchWrapperMockResult: any;
    setFamilyMembersArgs: any[];
};
export const testCases: FetchFamilyMembersTestCase[] = [
    {
        description: "should fetch family members",
        fetchWrapperMockResult: {
            data: [{}],
        },
        setFamilyMembersArgs: [[{}]],
    },
    {
        description: "should fetch family members, no results",
        fetchWrapperMockResult: {
            data: null,
        },
        setFamilyMembersArgs: [[]],
    },
]
import { fetchWrapper } from "@/app/_global/helpers/fetchWrapper";
import { LogEntry } from "../types";
import { FamilyMember } from "@/app/_family-members/types";
export const fetchLogEntries = async (
  setLogEntries: (logEntries: LogEntry[]) => void,
  page: number,
  search: string, 
  sort: string,
  selectedFamilyMembers: FamilyMember[],
  createdAfter: Date | null,
  createdBefore: Date | null,
) => {
  const queryString = new URLSearchParams();
  queryString.set("page", page.toString());
  queryString.set("search", search);
  queryString.set("sort", sort);
  queryString.set("familyMembers", selectedFamilyMembers.map((fm) => fm.id).join(","));
  if (createdAfter) {
    queryString.set("createdAfter", createdAfter.toISOString());
  }
  if (createdBefore) {
    queryString.set("createdBefore", createdBefore.toISOString());
  }
  const response = await fetchWrapper<LogEntry[]>(
    `${process.env.NEXT_PUBLIC_REST_API_URL}/log-entry?${queryString.toString()}`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  setLogEntries(response.data);
};

import { fetchWrapper } from "@/app/_global/helpers/fetchWrapper";
import { LogEntry } from "../types";
import { FamilyMember } from "@/app/_family-members/types";
export const fetchLogEntries = async (
  setLogEntries: (logEntries: LogEntry[]) => void,
  page: number,
  search: string, 
  sort: string,
  selectedFamilyMembers: FamilyMember[]
) => {
  const queryString = new URLSearchParams();
  queryString.set("page", page.toString());
  queryString.set("search", search);
  queryString.set("sort", sort);
  queryString.set("familyMembers", selectedFamilyMembers.map((fm) => fm.id).join(","));
  const response = await fetchWrapper<LogEntry[]>(
    `${process.env.NEXT_PUBLIC_REST_API_URL}/log-entry?${queryString.toString()}`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  setLogEntries(response.data);
};

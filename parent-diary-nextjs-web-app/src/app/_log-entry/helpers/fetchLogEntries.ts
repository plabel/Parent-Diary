import { fetchWrapper } from "@/app/_global/helpers/fetchWrapper";
import { LogEntry } from "../types";

export const fetchLogEntries = async (
  setLogEntries: (logEntries: LogEntry[]) => void,
  page: number,
  search: string, 
  sort: string
) => {
  const response = await fetchWrapper<LogEntry[]>(
    `${process.env.NEXT_PUBLIC_REST_API_URL}/log-entry?page=${page}&search=${search}&sort=${sort}`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  setLogEntries(response.data);
};

"use client";
import { useEffect, useState } from "react";
import LogEntryCard from "./log-entry-card";
import { LogEntry } from "./types";
import Pagination from "react-bootstrap/Pagination";
import { fetchWrapper } from "../_global/helpers/fetchWrapper";

export default function LogEntries() {
  const [logEntries, setLogEntries] = useState<LogEntry[]>([]);
  const [page, setPage] = useState(1);
  let pageItems = [];
  for (let number = 1; number <= 5; number++) {
    pageItems.push(
      <Pagination.Item
        key={number}
        active={number === page}
        onClick={() => setPage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }
  useEffect(() => {
    const fetchLogEntries = async () => {
      const response = await fetchWrapper<LogEntry[]>(
        `${process.env.NEXT_PUBLIC_REST_API_URL}/log-entry?page=${page}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      setLogEntries(response.data);
    };
    fetchLogEntries();
  }, [page]);
  return (
    <div>
      {logEntries?.map((logEntry) => (
        <LogEntryCard
          key={logEntry.id}
          entry={logEntry.entry}
          createdAt={logEntry.createdAt}
        />
      ))}
      {logEntries.length === 0 && <p>No log entries found</p>}
      <Pagination>{pageItems}</Pagination>
    </div>
  );
}

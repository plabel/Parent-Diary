"use client";
import { useEffect, useState } from "react";
import LogEntryCard from "./log-entry-card";
import { LogEntry } from "./types";
import Pagination from "react-bootstrap/Pagination";
import { fetchWrapper } from "../_global/helpers/fetchWrapper";
import { useAlert } from "../_global/alert/alert-provider";
import { deleteLogEntry } from "./helpers/deleteLogEntry";

export default function LogEntries() {
  const [logEntries, setLogEntries] = useState<LogEntry[]>([]);
  const [page, setPage] = useState(1);
  const showAlert = useAlert();
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
    fetchLogEntries();
  }, [page]);
  return (
    <div>
      {logEntries?.map((logEntry) => (
        <LogEntryCard
          key={logEntry.id}
          entry={logEntry.entry}
          createdAt={logEntry.createdAt}
          deleteFn={(setLoading) => deleteLogEntry(logEntry.id, setLoading, showAlert, fetchLogEntries)}
        />
      ))}
      {logEntries?.length === 0 && <p>No log entries found</p>}
      <Pagination>{pageItems}</Pagination>
    </div>
  );
}

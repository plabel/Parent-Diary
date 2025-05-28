"use client";
import { useEffect, useState } from "react";
import LogEntryCard from "./log-entry-card";
import { LogEntry } from "./types";
import Pagination from "react-bootstrap/Pagination";
import { useAlert } from "../_global/alert/alert-provider";
import { deleteLogEntry } from "./helpers/deleteLogEntry";
import { fetchLogEntries } from "./helpers/fetchLogEntries";
import { FamilyMembersContext } from "../_family-members/family-member-context";
import { fetchFamilyMembers } from "../_family-members/helpers/fetchFamilyMembers";
import { FamilyMember } from "../_family-members/types";
import { Button, Form } from "react-bootstrap";

export default function LogEntries() {
  const [logEntries, setLogEntries] = useState<LogEntry[]>([]);
  const [page, setPage] = useState(1);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const showAlert = useAlert();
  // context for family members TODO
  let pageItems = [];
  for (let number = 1; number <= 5; number++) {
    pageItems.push(
      <Pagination.Item
        key={number}
        active={number === page}
        onClick={() => setPage(number)}
        linkClassName="text-secondary border-secondary"
      >
        {number}
      </Pagination.Item>
    );
  }
  useEffect(() => {
    fetchLogEntries(setLogEntries, page);
    fetchFamilyMembers(setFamilyMembers);
  }, [page]);
  return (
    <FamilyMembersContext.Provider value={familyMembers}>
      <div className="container mb-3 px-0">
        <div className="row mx-0">
          <Button className="col col-1" variant="dark"><i className="bi bi-search"></i></Button>
          <div className="col col-11 pe-0">
            <Form.Control  type="text" placeholder="Normal text" />
          </div>
        </div>
      </div>
      <div>
        {logEntries?.map((logEntry) => (
          <LogEntryCard
          key={logEntry.id}
          entry={logEntry.entry}
          familyMembers={logEntry.familyMembers}
          id={logEntry.id}
          createdAt={logEntry.createdAt}
          deleteFn={(setLoading) =>
            deleteLogEntry(logEntry.id, setLoading, showAlert, () =>
              fetchLogEntries(setLogEntries, page)
            )
          }
          refreshLogEntries={() => fetchLogEntries(setLogEntries, page)}
        />
      ))}
      {logEntries?.length === 0 && <p>No log entries found</p>}
      <Pagination>{pageItems}</Pagination>
    </div>
    </FamilyMembersContext.Provider>
  );
}

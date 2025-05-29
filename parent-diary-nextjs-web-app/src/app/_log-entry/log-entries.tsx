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
import SearchBar from "./search-bar";

export default function LogEntries() {
  const [logEntries, setLogEntries] = useState<LogEntry[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("desc");
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [selectedFamilyMembers, setSelectedFamilyMembers] = useState<
    FamilyMember[]
  >([]);
  const showAlert = useAlert();
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
    fetchLogEntries(setLogEntries, page, search, sort, selectedFamilyMembers);
    fetchFamilyMembers(setFamilyMembers);
  }, [page, search, selectedFamilyMembers]);
  return (
    <FamilyMembersContext.Provider value={familyMembers}>
      <SearchBar
        setSearch={setSearch}
        setSort={setSort}
        sort={sort}
        refreshLogEntries={(newSort: string) =>
          fetchLogEntries(
            setLogEntries,
            page,
            search,
            newSort,
            selectedFamilyMembers
          )
        }
        allFamilyMembers={familyMembers}
        selectedFamilyMembers={selectedFamilyMembers}
        setSelectedFamilyMembers={setSelectedFamilyMembers}
      />
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
                fetchLogEntries(
                  setLogEntries,
                  page,
                  search,
                  sort,
                  selectedFamilyMembers
                )
              )
            }
            refreshLogEntries={() =>
              fetchLogEntries(
                setLogEntries,
                page,
                search,
                sort,
                selectedFamilyMembers
              )
            }
          />
        ))}
        {logEntries?.length === 0 && <p>No log entries found</p>}
        <Pagination>{pageItems}</Pagination>
      </div>
    </FamilyMembersContext.Provider>
  );
}

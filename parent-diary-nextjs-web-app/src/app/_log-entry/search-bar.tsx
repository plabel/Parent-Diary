import { SetStateAction } from "react";
import { Dispatch } from "react";
import { Form } from "react-bootstrap";

export type SearchBarProps = {
  setSearch: (search: string) => void,
  setSort: Dispatch<SetStateAction<string>>,
  sort: string,
  refreshLogEntries: (newSort: string) => void
}

export default function SearchBar({ setSearch, setSort, sort, refreshLogEntries }: SearchBarProps) {
  return (
    <div className="container mb-3 px-0">
        <div className="row mx-0 mb-1">       
          <div className="col col-12 px-0">
            <Form.Control onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Normal text" />
          </div>
        </div>
        <div className="row mx-0">
          <div className="col me-1 ps-0">        
            <button
              className="btn btn-dark rounded-circle p-2 lh-1 me-1"
              type="button"
            >
              <i className="bi bi-filter"></i>
            </button>          
            <button
              className="btn btn-dark rounded-circle p-2 lh-1 me-1"
              type="button"
              title="Sort by creation date"
              onClick={() => {
                const newSort = sort === "ASC" ? "DESC" : "ASC";
                setSort(newSort);
                refreshLogEntries(newSort);
              }}
            >
              <i className={`bi bi-sort-${sort === "ASC" ? "up" : "down"}`}></i>
            </button>          
          </div>     
        </div>
      </div>
  );
}
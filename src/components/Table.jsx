import { tab } from "@testing-library/user-event/dist/tab";
import React, { useState, useEffect } from "react";
import apiUrl from "../config/config";
import "../css/Table.css";
import { useStateValue } from "../stateProvider";
import fetchApiResponse from "../utils/apiHandler";
import EditableRow from "./EditableRow";
import Pagination from "./Pagination";
import ReadOnlyRow from "./ReadOnlyRow";

function Table() {
  const [{ data, duplicateGlobalData, editRowId }, dispatch] = useStateValue();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isCheckedState, setisCheckedState] = useState(false);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentPageData = data[0]?.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const fetchData = async () => {
    let data = await fetchApiResponse(apiUrl);
    data = data.map((row) => ({ ...row, isChecked: false }));
    dispatch({
      type: "ADD_DATA_TO_TABLE",
      data: data,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCheckedDelete = (e) => {
    e.preventDefault();
    dispatch({
      type: "DELETE_SELECTED",
      item: data,
    });
  };

  const handleSearch = (e) => {
    console.log(e.target.value);
    dispatch({
      type: "SEARCH",
      item: e.target.value,
    });
  };

  const handleEditButtonClick = (e, row) => {
    e.preventDefault();
    dispatch({
      type: "EDIT_BUTTON_CLICKED",
      id: row.id,
    });
  };

  const handleChecked = (e) => {
    const { name } = e.target;
    if (name === "allCheck") {
      data[0] = data[0].map((row, index) => {
        if (index >= indexOfFirstRow && index < indexOfLastRow) {
          row.isChecked = !isCheckedState;
          setisCheckedState(!isCheckedState);
        }
        return row;
      });
    } else {
      data[0] = data[0].map((row) => {
        if (row.id === name) {
          row.isChecked = true ? row.isChecked === false : true;
          return row;
        } else {
          return row;
        }
      });
    }

    dispatch({
      type: "UPDATE_DATA",
      item: data,
    });
  };

  return (
    <div className="table">
      <div className="search-delete-wrapper">
        <button
          onClick={handleCheckedDelete}
          className="delete-selected-button"
          id="button"
        >
          Delete Selected
        </button>
        <input
          type="text"
          className="search-bar"
          placeholder="Search here"
          onChange={handleSearch}
        />
      </div>

      <div>
        <table className="table-container">
          <thead className="table-head">
            <tr>
              <th>
                <input
                  type="checkbox"
                  name="allCheck"
                  id="allCheck"
                  defaultChecked={false}
                  onChange={handleChecked}
                />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentPageData?.map((row) => (
              <>
                {editRowId === row?.id ? (
                  <EditableRow
                    row={row}
                    key={row.id}
                    handleChecked={handleChecked}
                  />
                ) : (
                  <ReadOnlyRow
                    row={row}
                    key={row?.id}
                    isCheckedState={isCheckedState}
                    handleEditButtonClick={handleEditButtonClick}
                    handleChecked={handleChecked}
                  />
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        paginate={paginate}
        totalRows={data[0]?.length}
        rowsPerPage={rowsPerPage}
      />
    </div>
  );
}

export default Table;

import React from "react";
import { useStateValue } from "../stateProvider";
import "../css/Table.css";

function ReadOnlyRow({
  row,
  checkBoxChecked,
  handleEditButtonClick,
  handleChecked,
}) {
  const MAX_LENGTH = 20;
  const [{ data }, dispatch] = useStateValue();

  const currentRow = data[0].filter((item) => {
    if (item.id === row.id) {
      return row;
    }
  });
  const handleDeleteSingleRow = (e) => {
    e.preventDefault();
    dispatch({
      type: "SINGLE_ROW_DELETE",
      id: row.id,
    });
  };

  console.log(row?.isChecked);

  return (
    <tr key={row?.id}>
      <td>
        <input
          type="checkbox"
          // id={row?.id}
          name={row?.id}
          // checked={row?.isChecked || false}
          checked={true ? row.isChecked === true : false}
          onChange={handleChecked}
        />
        {/* {console.log("inside readonlyrow", row.name)} */}
      </td>
      <td className="table-cell">
        <p>{row?.name}</p>
        {/* {`${row?.name.substring(0, MAX_LENGTH)}...`}
        <a href="#">Read more</a> */}
      </td>
      <td className="table-cell">
        <p>{row?.email}</p>
      </td>
      <td className="table-cell">
        <p>{row?.role}</p>
      </td>
      <td className="table-cell">
        <button
          className="in-table-buttons"
          id="button"
          onClick={(e) => handleEditButtonClick(e, row)}
        >
          Edit
        </button>
        <button
          className="in-table-buttons"
          id="button"
          onClick={handleDeleteSingleRow}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
//

export default ReadOnlyRow;

import React, { useState } from "react";
import { useStateValue } from "../stateProvider";
import "../css/Table.css";

function EditableRow({ handleChecked }) {
  const [{ data, editRowId, underEditRow }, dispatch] = useStateValue();

  const [editRowData, seteditRowData] = useState(underEditRow);

  const handleRowDataEdit = (e) => {
    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;

    seteditRowData({
      ...editRowData,
      [fieldName]: fieldValue,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    dispatch({
      type: "EDIT_ROW_SAVE_BUTTON_CLICKED",
      item: editRowData,
    });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    dispatch({
      type: "EDIT_ROW_CANCEL_BUTTON_CLICKED",
      item: underEditRow,
    });
  };

  return (
    <tr key={editRowId.id}>
      <td className="table-cell">
        <input
          type="checkbox"
          name={underEditRow?.id}
          checked={true ? underEditRow.isChecked === true : false}
          onChange={handleChecked}
        />
      </td>
      <td className="table-cell">
        <input
          type="text"
          name="name"
          defaultValue={underEditRow.name}
          onChange={handleRowDataEdit}
        />
      </td>
      <td className="table-cell">
        <input
          type="text"
          name="email"
          defaultValue={underEditRow.email}
          onChange={handleRowDataEdit}
        />
      </td>
      <td className="table-cell">
        <input
          type="text"
          name="role"
          defaultValue={underEditRow.role}
          onChange={handleRowDataEdit}
        />
      </td>
      <td className="table-cell">
        <button
          className="in-table-buttons"
          id="button"
          onClick={handleSave}
          type="submit"
        >
          Save
        </button>
        <button className="in-table-buttons" id="button" onClick={handleCancel}>
          Cancel
        </button>
      </td>
    </tr>
  );
}

export default EditableRow;

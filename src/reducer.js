export const initialState = {
  data: [],
  duplicateGlobalData: [],
  editRowId: null,
  underEditRow: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_DATA":
      return {
        ...state,
        data: [...state.data, action.data],
        duplicateGlobalData: [...state.data, action.data],
      };

    case "DELETE_SELECTED":
      let postDeleteDuplicateGlobalData = state.duplicateGlobalData[0].filter(
        (row) => {
          if (row.isChecked === false) {
            return row;
          }
        }
      );

      // console.log(postDeleteDuplicateGlobalData);
      return {
        ...state,
        data: [postDeleteDuplicateGlobalData],
        duplicateGlobalData: [postDeleteDuplicateGlobalData],
      };

    case "ADD_DATA_TO_TABLE":
      return {
        ...state,
        data: [...state.data, action.data],
        duplicateGlobalData: [...state.data, action.data],
      };

    case "SEARCH":
      let afterSearchData = [];
      if (action.item === "") {
        afterSearchData = state.duplicateGlobalData[0];
      } else {
        afterSearchData = state.duplicateGlobalData[0]?.filter(
          (row) =>
            row?.name?.toLowerCase().indexOf(action?.item?.toLowerCase()) >
              -1 ||
            row?.email?.toLowerCase().indexOf(action?.item?.toLowerCase()) >
              -1 ||
            row?.role?.toLowerCase().indexOf(action?.item?.toLowerCase()) > -1
        );
      }
      return {
        ...state,
        data: [afterSearchData],
        duplicateGlobalData: state.duplicateGlobalData,
      };

    case "EDIT_BUTTON_CLICKED":
      let underEditingRow = state.data[0].filter((row) => {
        return row ? row.id == action.id : true;
      });
      return {
        ...state,
        editRowId: action.id,
        underEditRow: underEditingRow[0],
      };

    case "EDIT_ROW_SAVE_BUTTON_CLICKED":
      let newData = [...state.data];
      let duplicateGlobalDataCopyForEdit = [...state.duplicateGlobalData];

      let duplicateNewData = newData[0].map(
        (row) =>
          [action.item].find((editedRow) => editedRow.id === row.id) || row
      );
      let afterEditDuplicateNewGlobalData =
        duplicateGlobalDataCopyForEdit[0].map(
          (row) =>
            [action.item].find((editedRow) => editedRow.id === row.id) || row
        );
      return {
        ...state,
        data: [duplicateNewData],
        duplicateGlobalData: [afterEditDuplicateNewGlobalData],
        editRowId: null,
      };

    case "EDIT_ROW_CANCEL_BUTTON_CLICKED":
      let cancelData = [...state.data];
      return {
        ...state,
        data: cancelData,
        duplicateGlobalData: cancelData,
        editRowId: null,
      };

    case "SINGLE_ROW_DELETE":
      let duplicateData = [...state.data];
      let duplicateGlobalDataCopy = [...state.duplicateGlobalData];
      let afterSingleRowDeleteData = duplicateData[0].filter((row) => {
        if (row.id !== action.id) {
          return row;
        }
      });

      let afterSingleRowDeleteDuplicateGlobalData =
        duplicateGlobalDataCopy[0].filter((row) => {
          if (row.id !== action.id) {
            return row;
          }
        });
      return {
        ...state,
        data: [afterSingleRowDeleteData],
        duplicateGlobalData: [afterSingleRowDeleteDuplicateGlobalData],
      };
  }
};

export default reducer;

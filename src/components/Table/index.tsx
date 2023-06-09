import {
  deleteMarkedPeople,
  deletePerson,
  markPeople,
  savePerson,
} from "../../store/reducers/personReducer";
import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RowData } from "../interfaces";
import { useTranslation } from "react-i18next";
import {
  DataGrid,
  GridActionsCellItem,
  GridCellModes,
  GridCellModesModel,
  GridRowId,
  GridRowParams,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

//interface SelectedCellParams2 {
//  id: GridRowId;
//  fields: string[];
//}

interface SelectedCellParams {
  id: GridRowId;
  field: string;
}

interface EditToolbarProps {
  selectedCellParams?: SelectedCellParams;
  cellModesModel: GridCellModesModel;
  setCellModesModel: (value: GridCellModesModel) => void;
  cellMode: "view" | "edit";
}

function EditToolbar({
  selectedCellParams,
  cellMode,
  cellModesModel,
  setCellModesModel,
}: EditToolbarProps) {
  const handleSaveOrEdit = () => {
    if (!selectedCellParams) {
      return;
    }
    const { id, field } = selectedCellParams;
    setCellModesModel({
      ...cellModesModel,
      [id]: {
        ...cellModesModel[id],
        [field]: {
          mode: cellMode === "edit" ? GridCellModes.View : GridCellModes.Edit,
        },
      },
    });
  };

  const handleCancel = () => {
    if (!selectedCellParams) {
      return;
    }
    const { id, field } = selectedCellParams;
    setCellModesModel({
      ...cellModesModel,
      [id]: {
        ...cellModesModel[id],
        [field]: { mode: GridCellModes.View, ignoreModifications: true },
      },
    });
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        p: 1,
      }}
    >
      <Button
        onClick={handleSaveOrEdit}
        onMouseDown={handleMouseDown}
        disabled={!selectedCellParams}
        variant="outlined"
      >
        {cellMode === "edit" ? "Save" : "Edit"}
      </Button>
      <Button
        onClick={handleCancel}
        onMouseDown={handleMouseDown}
        disabled={cellMode === "view"}
        variant="outlined"
        sx={{ ml: 1 }}
      >
        Cancel
      </Button>
    </Box>
  );
}

//interface CellMode {
//  id: number;
//  mode: "edit" | "view";
//}

export default function Table() {
  const people = useSelector((state: { people: RowData[] }) => state.people);
  const dispatch = useDispatch();
  const [selectedCellParams, setSelectedCellParams] =
    useState<SelectedCellParams | null>(null);
  const [cellModesModel, setCellModesModel] = useState<GridCellModesModel>({});
  //const [cellModes, setCellModes] = useState<CellMode[]>(
  //  people.map((person) => ({ id: person.id, mode: "view" })),
  //);
  const { t } = useTranslation();

  const handleCellFocus = useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      const row = event.currentTarget.parentElement;
      const id = row!.dataset.id!;
      const field = event.currentTarget.dataset.field!;
      setSelectedCellParams({ id, field });
    },
    [],
  );

  const cellMode = useMemo(() => {
    if (!selectedCellParams) {
      return "view";
    }
    const { id, field } = selectedCellParams;
    return cellModesModel[id]?.[field]?.mode || "view";
  }, [cellModesModel, selectedCellParams]);

  //const editRow = (id: GridRowId) => {
  //  setCellModesModel({
  //    ...cellModesModel,
  //    [id]: {
  //      ...cellModesModel[id],
  //      name: { mode: GridCellModes.Edit },
  //      age: { mode: GridCellModes.Edit },
  //      birthdate: { mode: GridCellModes.Edit },
  //      biography: { mode: GridCellModes.Edit },
  //    },
  //  });
  //  setCellModes(
  //    cellModes.map((cellMode) =>
  //      cellMode.id === id ? { ...cellMode, mode: "edit" } : cellMode,
  //    ),
  //  );
  //};

  //const saveRow = (id: GridRowId) => {
  //  setCellModesModel({
  //    ...cellModesModel,
  //    [id]: {
  //      ...cellModesModel[id],
  //      name: { mode: GridCellModes.View },
  //      age: { mode: GridCellModes.View },
  //      birthdate: { mode: GridCellModes.View },
  //      biography: { mode: GridCellModes.View },
  //    },
  //  });
  //  setCellModes(
  //    cellModes.map((cellMode) =>
  //      cellMode.id === id ? { ...cellMode, mode: "view" } : cellMode,
  //    ),
  //  );
  //  const rowData = people.find((person) => person.id === id);
  //  dispatch(savePerson({ rowData }));
  //};

  const columns = [
    { field: "name", headerName: "Name", editable: true },
    { field: "age", headerName: "Age", editable: true },
    { field: "birthdate", headerName: "Birthdate", editable: true },
    { field: "biography", headerName: "Biography", editable: true },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      getActions: ({ id }: GridRowParams) => {
        //const mode = cellModes.find((cellMode) => cellMode.id === id)?.mode;
        return [
          //<GridActionsCellItem
          //  icon={mode === "view" ? <EditIcon /> : <SaveIcon />}
          //  onClick={() => (mode === "view" ? editRow(id) : saveRow(id))}
          //  label="Edit"
          ///>,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            onClick={() => dispatch(deletePerson({ id }))}
            label="Delete"
          />,
        ];
      },
    },
  ];
  const processRowUpdate = useCallback(
    async (newRow: RowData) => {
      newRow = { ...newRow, age: Number(newRow.age) };
      const response = dispatch(savePerson({ rowData: newRow }));
      return response.payload.rowData; // return the new row containing the row id
    },
    [dispatch],
  );
  return (
    <>
      <DataGrid
        rows={people}
        columns={columns}
        editMode="row"
        initialState={{
          pagination: { paginationModel: { page: 0, pageSize: 5 } },
        }}
        pageSizeOptions={[5, 10, 20]}
        checkboxSelection
        onRowSelectionModelChange={(ids) => dispatch(markPeople({ ids }))}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={(error) => {
          console.log(error);
        }}
        getRowId={(row) => row.id}
        cellModesModel={cellModesModel}
        onCellModesModelChange={(model) => setCellModesModel(model)}
        slots={{ toolbar: EditToolbar }}
        slotProps={{
          toolbar: {
            cellMode,
            selectedCellParams,
            setSelectedCellParams,
            cellModesModel,
            setCellModesModel,
          },
          cell: {
            onFocus: handleCellFocus,
          },
        }}
      />
      <button onClick={() => dispatch(deleteMarkedPeople())}>
        Delete marked
      </button>
    </>
  );

  /*
  return (
    <>
      <div className={styles["selection-wrapper"]}>
        {t("show")}
        <select className={styles["rows-selection"]} onChange={handleChange}>
          {tableRowsPerPage.map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        {t("records")}
      </div>
      <table className={styles.table}>
        <thead>
          <HeaderRow />
        </thead>
        <tbody>
          {slice.map((person) => (
            <React.Fragment key={person.id}>
              {person.id === editId ? (
                <EditableRow
                  key={person.id}
                  person={person}
                  setEditId={setEditId}
                />
              ) : (
                <ReadOnlyRow
                  key={person.id}
                  person={person}
                  setEditId={setEditId}
                />
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
  );
  */
}

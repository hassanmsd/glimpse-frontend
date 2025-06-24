import {
  DataGridProps,
  DataGrid as MuiDataGrid,
  gridClasses,
} from "@mui/x-data-grid";

const DataGrid = (props: DataGridProps) => (
  <MuiDataGrid
    sx={{
      [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]: {
        outline: "none",
      },
      [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]:
        {
          outline: "none",
        },
    }}
    {...props}
  />
);

export default DataGrid;

import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid"
import "./InfoTable.scss"

const InfoTable = () => {
  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'likedMost', headerName: 'Liked Most', width: 250, editable: false },
    { field: 'likedLess', headerName: 'Liked Less', width: 250, editable: false },
    { field: 'comments', headerName: 'Comments', width: 150, type: 'number', editable: false },
    { field: 'country', headerName: 'Country', width: 150, editable: false },
    { field: 'hotel', headerName: 'Hotel', width: 200, editable: false },
    { field: 'service', headerName: 'Service', width: 150, editable: false },
    { field: 'therapist', headerName: 'Therapist', width: 150, editable: false },
    { field: 'customerAge', headerName: 'Customer Age', width: 120, type: 'number', editable: false },
    { field: 'customerCountry', headerName: 'Customer Country', width: 200, editable: false },
    { field: 'createAt', headerName: 'Created At', width: 180, editable: false },
    { field: 'liabilityReleasedId', headerName: 'Liability Released ID', width: 200, editable: false },
  
  ];
  
  const rows = [
    {
      id: 1,
      likedMost: "The facility is very clean and the staff is very friendly. Mariana was very attentive and friendly.",
      likedLess: "",
      comments: 5,
      country: "Mexico",
      hotel: "Riu Dunamar",
      service: "Massage",
      therapist: "Annam Syed",
      customerAge: 30,
      customerCountry: "Canada",
      therapistOld: "",
      createAt: "15/11/2024 22:09:39",
      liabilityReleasedId: 439847,
    },
    {
      id: 2,
      likedMost: "La qualité du massage",
      likedLess: "",
      comments: 5,
      country: "Cape Verde",
      hotel: "Riu Touareg Hotel",
      service: "Massage",
      therapist: "Severine Julien",
      customerAge: 51,
      customerCountry: "France",
      therapistOld: "",
      createAt: "15/11/2024 13:12:32",
      liabilityReleasedId: 439390,
    },
    {
      id: 3,
      likedMost: "Very nice ambiance and the massage was amazing",
      likedLess: "That I can't stay forever",
      comments: 5,
      country: "Mexico",
      hotel: "Riu Latino",
      service: "Massage",
      therapist: "Emily Blair",
      customerAge: 29,
      customerCountry: "United States of America",
      therapistOld: "",
      createAt: "10/11/2024 21:59:53",
      liabilityReleasedId: 436430,
    },
    {
      id: 4,
      likedMost: "La gentillesse des hôtesses et la qualité du service",
      likedLess: "",
      comments: 5,
      country: "Cape Verde",
      hotel: "Riu Touareg Hotel",
      service: "Massage",
      therapist: "Silvana Ludswuit",
      customerAge: 59,
      customerCountry: "Germany",
      therapistOld: "",
      createAt: "13/11/2024 00:02:57",
      liabilityReleasedId: 434072,
    },
    {
      id: 5,
      likedMost: "Very good quality massage and professionalism",
      likedLess: "",
      comments: 5,
      country: "Mexico",
      hotel: "Riu Caribe",
      service: "Massage",
      therapist: "Rajkumar Persaud",
      customerAge: 69,
      customerCountry: "United States of America",
      therapistOld: "",
      createAt: "13/11/2024 16:05:19",
      liabilityReleasedId: 437685,
    },
  ];
  return (
    <div className="InfoTable">
            <DataGrid className="dataGrid"
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{toolbar:GridToolbar}}
        slotProps={{
          toolbar:{
            showQuickFilter:true,
            quickFilterProps: { debounceMs: 500 },
          }
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        
        disableDensitySelector
      />
    </div>
  )
}

export default InfoTable
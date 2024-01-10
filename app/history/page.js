"use client"
import Navbar from "../navBar.js";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import * as React from 'react';
import { styled } from '@mui/system';
import {
  TablePagination,
  tablePaginationClasses as classes,
} from '@mui/base/TablePagination';
import FirstPageRoundedIcon from '@mui/icons-material/FirstPageRounded';
import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { CSVLink, CSVDownload } from "react-csv";

function TableCustomized(props) {
    const {rows}=props
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    return (
      <Root sx={{ width: 'full', maxWidth: '100%' }}>
        <table aria-label="custom pagination table" className="w-full">
          <thead>
            <tr>
              <th>Date</th>
              <th>Product</th>
              <th>Elec </th>
              <th>Boundary Elec</th>
              <th>CO2</th>
              <th>Boundary CO2</th>
              <th>Outliers</th>
            </tr>
          </thead>
          <tbody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <tr key={row.name}>
                <td>{row.name}</td>
                <td style={{ width: 120 }} align="right">
                  {row.calories}
                </td>
                <td style={{ width: 120 }} align="right">
                  {row.fat}
                </td>
                <td style={{ width: 120 }} align="right">
                  {row.fat}
                </td>
                <td style={{ width: 120 }} align="right">
                  {row.fat}
                </td>
                <td style={{ width: 120 }} align="right">
                  {row.fat}
                </td>
                <td style={{ width: 120 }} align="right">
                  {row.fat}
                </td>
              </tr>
            ))}
  
            {emptyRows > 0 && (
              <tr style={{ height: 34 * emptyRows }}>
                <td colSpan={7} aria-hidden />
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <CustomTablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={7}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    'aria-label': 'rows per page',
                  },
                  actions: {
                    showFirstButton: true,
                    showLastButton: true,
                    slots: {
                      firstPageIcon: FirstPageRoundedIcon,
                      lastPageIcon: LastPageRoundedIcon,
                      nextPageIcon: ChevronRightRoundedIcon,
                      backPageIcon: ChevronLeftRoundedIcon,
                    },
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </tr>
          </tfoot>
        </table>
      </Root>
    );
  }

function createData(name, calories, fat) {
  return { name, calories, fat };
}

const blue = {
  50: '#F0F7FF',
  200: '#A5D8FF',
  400: '#3399FF',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Root = styled('div')(
  ({ theme }) => `
  border-radius: 12px;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
  overflow: clip;

  table {
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    border-collapse: collapse;
    border: none;
    margin: -1px;
  }

  td,
  th {
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    text-align: left;
    padding: 8px;
  }

  `,
);

const CustomTablePagination = styled(TablePagination)(
  ({ theme }) => `
  & .${classes.spacer} {
    display: none;
  }

  & .${classes.toolbar}  {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    padding: 4px 0;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .${classes.selectLabel} {
    margin: 0;
  }

  & .${classes.select}{
    font-family: 'IBM Plex Sans', sans-serif;
    padding: 2px 0 2px 4px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    border-radius: 6px; 
    background-color: transparent;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    transition: all 100ms ease;

    &:hover {
      background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
    }

    &:focus {
      outline: 3px solid ${theme.palette.mode === 'dark' ? blue[400] : blue[200]};
      border-color: ${blue[400]};
    }
  }

  & .${classes.displayedRows} {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .${classes.actions} {
    display: flex;
    gap: 6px;
    border: transparent;
    text-align: center;
  }

  & .${classes.actions} > button {
    display: flex;
    align-items: center;
    padding: 0;
    border: transparent;
    border-radius: 50%;
    background-color: transparent;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    transition: all 120ms ease;

    > svg {
      font-size: 22px;
    }

    &:hover {
      background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
    }

    &:focus {
      outline: 3px solid ${theme.palette.mode === 'dark' ? blue[400] : blue[200]};
      border-color: ${blue[400]};
    }

    &:disabled {
      opacity: 0.3;
      &:hover {
        border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
        background-color: transparent;
      }
    }
  }
  `,
);
export default function Home() {
    const [rows,setRows]=React.useState( [
        createData('Cupcake', 305, 3.7),
        createData('Donut', 452, 25.0),
        createData('Eclair', 262, 16.0),
        createData('Frozen yoghurt', 159, 6.0),
        createData('Gingerbread', 356, 16.0),
        createData('Honeycomb', 408, 3.2),
        createData('Ice cream sandwich', 237, 9.0),
        createData('Jelly Bean', 375, 0.0),
        createData('KitKat', 518, 26.0),
        createData('Lollipop', 392, 0.2),
        createData('Marshmallow', 318, 0),
        createData('Nougat', 360, 19.0),
        createData('Oreo', 437, 18.0),
      ].sort((a, b) => (a.calories < b.calories ? -1 : 1)))
    const [begin,setBegin]=React.useState()
    const [end,setEnd]=React.useState()
    const changeData=async ()=>{
        setRows( [
            // createData('Gingerbread', 356, 16.0),
            // createData('Honeycomb', 408, 3.2),
            // createData('Ice cream sandwich', 237, 9.0),
            // createData('Jelly Bean', 375, 0.0),
            // createData('KitKat', 518, 26.0),
            // createData('Lollipop', 392, 0.2),
            // createData('Marshmallow', 318, 0),
            // createData('Nougat', 360, 19.0),
            // createData('Oreo', 437, 18.0),
          ])
        console.log(begin)
        console.log(end)
    }
    const csvData = [
        ["firstname", "lastname", "email"],
        ["Ahmed", "Tomi", "ah@smthing.co.com"],
        ["Raed", "Labes", "rl@smthing.co.com"],
        ["Yezzi", "Min l3b", "ymin@cocococo.com"]
      ];
      
    return (
      <>
        <Navbar></Navbar>
        <div className="container mx-auto my-4 p-4">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="mb-4 flex">
              <div className="mr-4">
                <label className="block text-gray-700 text-sm font-bold mt-2 pl-3">
                   Ngày bắt đầu
                </label>
                <DatePicker className="border rounded w-full py-2 px-3"
                onChange={(newValue)=>setBegin(newValue)}/>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mt-2 pl-3">
                  Ngày kết thúc
                </label>
                <DatePicker className="border rounded w-full py-2 px-3"
                onChange={(newValue)=>setEnd(newValue)} />
              </div>
              
      
      
            </div>
          </LocalizationProvider>
          <div >
              
              <button
  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-700 rounded-md ml-2 "
  //onClick={handleOpen}
  onClick={changeData}
>
        Tìm kiếm
        
      </button>
      </div>
          <div className="mt-4">
              <button
  className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 border border-blue-700 rounded-md ml-2 "
  //onClick={handleOpen}
>
<CSVLink data={csvData}>Download csv</CSVLink>


      </button>

      </div>
          <div className="mt-4">
          <TableCustomized rows={rows} />
          </div>
        </div>
      </>
    );
  }
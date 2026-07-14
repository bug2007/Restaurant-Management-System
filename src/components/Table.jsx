import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import { useState } from 'react';
import noProfileImg from '../assets/noPfp.png'

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

// function descendingComparator(a, b, orderBy) {  
//   const valA = (a.user[orderBy] || a[orderBy] || "").toString().toLowerCase()    // e.g a[orderBy] cud mean row['phoneNumber']
//   const valB = (b.user[orderBy] || b[orderBy] || "").toString().toLowerCase();

//   if (valB < valA) {    
//     return -1;
//   }
//   if (valB > valA) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

const headCells = [
  {
    id: 'fullName',
    label: 'Employee',
  },
  {
    id: 'email',
    label: 'Email',
  },
  {
    id: 'designation',
    label: 'Designation',
  },
  {
    id: 'joinDate',
    label: 'Join Date',
  },
  {
    id: 'phoneNumber',
    label: 'Phone',
  },
  {
    id: 'actions',
    label: 'Actions',
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            // sortDirection={orderBy === headCell.id ? order : false}  // for screen readers
          >
            {headCell.id !== 'actions' && headCell.id !== 'fullName' && headCell.id !== 'phoneNumber' ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}

                {orderBy === headCell.id && (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </Box>
                )}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}



export default function EnhancedTable({rows, total, currentPage, rowsPerPage, rowsPerPageOptions, onPageChange, onRowsPerPageChange, sort, onSortChange}) {

  const handleRequestSort = (event, property) => {
    const [currentField, currentOrder] = sort.split(' ');

    let newOrder = 'asc';

    if (currentField === property && currentOrder === 'asc') {
      newOrder = 'desc';
    }

    onSortChange(`${property} ${newOrder}`);
  };

  const handleChangePage = (event, newPage) => {
    onPageChange(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    onRowsPerPageChange(Number(event.target.value))
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, borderRadius: 3, overflow: 'hidden'}} elevation={4}>
        <TableContainer sx={{
            height: '75vh',
            '&::-webkit-scrollbar': { display: 'none' },
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'}}>
          <Table
            stickyHeader
            sx={{ 
              minWidth: 750,
              '& .MuiTableCell-root': {
                height: 80,
                fontSize: '18px',
                px: 4
              },
              '& .MuiTableHead-root .MuiTableCell-root': {
                color: (theme) => theme.palette.primary.main,
                '& .MuiTableSortLabel-root': {
                  color: (theme) => theme.palette.primary.main,
                  '& .MuiTableSortLabel-icon': {
                    fontSize: '18px'
                  },
                },
              }
            }}
            aria-labelledby="tableTitle"
          >
            <EnhancedTableHead
              order={sort.split(' ')[1] || 'asc'}
              orderBy={sort.split(' ')[0] || ''}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {rows.map((row, index) => {
                return (
                  <TableRow
                    hover
                    sx={{
                      '&:hover .MuiTableCell-root': {
                        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.15),
                      }
                    }}
                    key={row.id}
                  >
                    <TableCell sx={{display: 'flex', alignItems: 'center', gap: '15px'}}
                      component="th"
                      scope="row"
                    >  
                      <img 
                        src={`https://bssrms.runasp.net/images/user/${row.user.image}`} 
                        style={{width: '35px', height: '35px', borderRadius: '50%', objectFit: 'cover'}}
                        onError={(e) => {e.target.src = noProfileImg, e.target.onerror=null}} />
                      {row.user.fullName}
                    </TableCell>
                    <TableCell>{row.user.email}</TableCell>
                    <TableCell>{row.designation}</TableCell>
                    <TableCell>{formatDate(row.joinDate)}</TableCell>
                    <TableCell>{row.user.phoneNumber}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={total}
          page={currentPage - 1}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

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
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { useState, useMemo } from 'react';
import noProfileImg from '../assets/noPfp.png'

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function descendingComparator(a, b, orderBy) {  
  const valA = (a.user[orderBy] || a[orderBy] || "").toString().toLowerCase()    // e.g a[orderBy] cud mean row['phoneNumber']
  const valB = (b.user[orderBy] || b[orderBy] || "").toString().toLowerCase();

  if (valB < valA) {    
    return -1;
  }
  if (valB > valA) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

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
            sortDirection={orderBy === headCell.id ? order : false}  // for screen readers
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}



export default function EnhancedTable({rows}) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, borderRadius: 3, overflow: 'hidden'}} elevation={4}>
        <TableContainer sx={{
            maxHeight: 530,
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
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
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
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={5} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

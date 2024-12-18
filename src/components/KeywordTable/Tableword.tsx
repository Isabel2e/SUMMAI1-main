import React, { useState } from 'react';
import './Tableword.scss';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  TableHead,
  IconButton,
  Switch,
} from '@mui/material';
import { CiEdit } from 'react-icons/ci';
import TablePaginationActions from './TablePaginationActions';

interface Word {
  id: number;
  word: string;
  language: string;
  is_active: boolean;
}

interface KeywordTableProps {
  words: Word[]; // Define las palabras que se pasarán como prop
  setWords: React.Dispatch<React.SetStateAction<Word[]>>;
  onEdit: (word: Word) => void;
}

const KeywordTable: React.FC<KeywordTableProps> = ({ words, setWords, onEdit }) => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const handleDisable = async (id: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/Disable-Word/${id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const data = await response.json(); // Asegúrate de que la respuesta contiene el estado actualizado
        setWords((prevWords) =>
          prevWords.map((word) =>
            word.id === id ? { ...word, is_active: data.is_active } : word
          )
        );
      } else {
        console.error('Error al deshabilitar la palabra.');
      }
    } catch (err) {
      console.error('Error de conexión con el servidor.', err);
    }
  };

  const handleChangePage = (_: unknown, newPage: number): void => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper} className="table-container">
      <Table aria-label="custom table">
        <TableHead className="tablehead">
          <TableRow>
            <TableCell style={{ width: '30%' }}>Word</TableCell>
            <TableCell>Language</TableCell>
            <TableCell>Disable</TableCell>
            <TableCell align="center">Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? words.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : words
          ).map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.word}
              </TableCell>
              <TableCell>{row.language}</TableCell>
              <TableCell align="center">
                <Switch
                  checked={row.is_active}
                  onChange={() => handleDisable(row.id)}
                  color="primary"
                />
              </TableCell>
              <TableCell align="center">
                <IconButton onClick={() => onEdit(row)}>
                  <CiEdit />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={4}
              count={words.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default KeywordTable;

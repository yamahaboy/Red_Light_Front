import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  getInfringementsDatesToStore,
  setPaginationData,
} from "../../store/reducers/infringementsReducer/actions";
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  Chip,
  Container,
  Typography,
} from "@mui/material";
import { InfringementsProps } from "../../models/InfringementsProps";
import ModalWindowImage from "../ModalWindowImage/ModalWindowImage";

const Table: React.FC = () => {
  const { dateList, count, limit, currentPage } = useAppSelector(
    (state) => state.infringementsReducer
  );
  const dispatch = useAppDispatch();
  const [rowsPerPage, setRowsPerPage] = useState<number>(limit);

  const handleChangePage = (_event: unknown, newPage: number) => {
    // const offset = newPage * rowsPerPage;
    dispatch(setPaginationData(count, newPage + 1, rowsPerPage));
    dispatch(getInfringementsDatesToStore());
  };

  const handleChangeRowsPerPage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    await dispatch(setPaginationData(count, 1, newRowsPerPage));
    await dispatch(getInfringementsDatesToStore());
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    dispatch(getInfringementsDatesToStore());
  }, [dispatch]);
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center", 
        maxWidth: "100%",
        padding: 0,
        marginTop: 4,
      }}
    >
      <TableContainer
        component={Paper}
        sx={{
          flexGrow: 1,
          width: "100%",
        }}
      >
        <MuiTable sx={{ width: "100%" }}>
          <TableHead
            sx={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              backgroundColor: "#f5f5f5",
            }}
          >
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>ID</TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Created At</TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Modified At</TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Reported At</TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Red Light Detected</TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Detection Zone Frame</TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Full Frame</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dateList.map((infringement: InfringementsProps) => (
              <TableRow key={infringement.id}>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>{infringement.id}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Typography variant="subtitle2">
                    {formatDate(infringement.created_at)}
                  </Typography>
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Typography variant="subtitle2">
                    {formatDate(infringement.modified_at)}
                  </Typography>
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Typography variant="subtitle2">
                    {formatDate(infringement.ts)}
                  </Typography>
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Chip
                    label={
                      infringement.is_red_traffic_light_detected ? "Yes" : "No"
                    }
                    color={
                      infringement.is_red_traffic_light_detected
                        ? "error"
                        : "success"
                    }
                    sx={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                  />
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <ModalWindowImage
                    src={`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/image/${infringement.road_frame_filename}`}
                    alt={`Road Frame ${infringement.id}`}
                  />
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <ModalWindowImage
                    src={`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/image/${infringement.full_frame_filename}`}
                    alt={`Full Frame ${infringement.id}`}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={count}
        rowsPerPage={limit}
        page={currentPage - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ width: "100%" }}
      />
    </Container>
  );
};

export default Table;

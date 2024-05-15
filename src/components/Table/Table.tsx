import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  getInfringementsDatesToStore,
  setPaginationData,
} from "../../store/reducers/infringementsReducer/actions";
import testImg from "../../assets/images/1715384572756_88d0b3e5fc0f469d9dc0c1ed277850aa_analyzed_road_full_frame.webp";
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

  const handleChangePage = async (_event: unknown, newPage: number) => {
    const offset = newPage * rowsPerPage;
    await dispatch(setPaginationData(count, newPage + 1, rowsPerPage));
    await dispatch(getInfringementsDatesToStore(rowsPerPage, offset));
  };

  const handleChangeRowsPerPage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    await dispatch(setPaginationData(count, 1, newRowsPerPage));
    await dispatch(getInfringementsDatesToStore(newRowsPerPage, 0));
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
    const offset = (currentPage - 1) * limit;
    dispatch(getInfringementsDatesToStore(limit, offset));
  }, [dispatch, limit, currentPage]);
  return (
    <Container
      sx={{
        height: "auto",
        display: "flex",
        flexDirection: "column",
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
              <TableCell sx={{fontWeight:"bold"}}>ID</TableCell>
              <TableCell sx={{fontWeight:"bold"}}>Road Frame</TableCell>
              <TableCell sx={{fontWeight:"bold"}}>Full Frame</TableCell>
              <TableCell sx={{fontWeight:"bold"}}>Created At</TableCell>
              <TableCell sx={{fontWeight:"bold"}}>Modified At</TableCell>
              <TableCell sx={{fontWeight:"bold"}}>Timestamp</TableCell>
              <TableCell sx={{fontWeight:"bold"}}>Red Light</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dateList.map((infringement: InfringementsProps) => (
              <TableRow key={infringement.id}>
                <TableCell sx={{fontWeight:"bold"}}>{infringement.id}</TableCell>
                <TableCell>
                  <ModalWindowImage
                    src={`${testImg}`}
                    alt={`Road Frame ${infringement.id}`}
                  />
                </TableCell>
                <TableCell>
                <ModalWindowImage
                    src={`${testImg}`}
                    alt={`Full Frame ${infringement.id}`}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">
                    {formatDate(infringement.created_at)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">
                    {formatDate(infringement.modified_at)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">
                    {formatDate(infringement.ts)}
                  </Typography>
                </TableCell>
                <TableCell>
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

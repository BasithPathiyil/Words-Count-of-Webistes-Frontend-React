import {
  Alert,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import api from "../utils/api";

function DetailedInsight() {
  const [data, setData] = useState(null);
  const params = useParams();
  useEffect(() => {
    async function fetchData() {
      const response = await api.get(
        `/insights/getDetailedInsight?id=${params?.insightId}`
      );
      setData(response.data.insightData);
    }
    fetchData();
  }, []);
  console.log(data);
  return (
    <>
      <Header />
      <Grid container>
        <Grid item xs={12} md={12} sm={12}>
          <Alert
            icon={false}
            severity="success"
            sx={{ textAlign: "center", justifyContent: "center" }}
          >
            We found {data?.wordsLength} words on {data?.url}
          </Alert>
        </Grid>
        <Grid item xs={12} md={12} sm={12}>
          <Table sx={{ maxWidth: "100%" }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: "70%" }}>Keyword</TableCell>
                <TableCell>Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.keywordArray?.map((word, i) => (
                <TableRow key={i}>
                  <TableCell>{word?.keyword}</TableCell>
                  <TableCell>{word?.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </>
  );
}

export default DetailedInsight;

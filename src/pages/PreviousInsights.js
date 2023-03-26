import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { useAsyncValue, useNavigate } from "react-router-dom";
import LoadingCircle from "../components/LoadingCircle";

function PreviousInsights({ refresh, setRefresh, emailId }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  console.log(emailId);
  const [previousInsights, setPreviousInsights] = useState([]);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await api.get(
        `/insights/getInsightswithEmailId?emailId=${emailId}`
      );
      console.log(response);
      setPreviousInsights(response.data.insightData);
      setLoading(false);
    }
    fetchData();
  }, [refresh]);
  console.log(previousInsights);
  const handleClickInsights = (id) => {
    navigate(`/detailedinsight/${id}`);
  };
  const handleClickDelete = async (id) => {
    await api.delete(`/insights/deleteInsight?id=${id}`);
    setRefresh(refresh + 1);
  };
  const handleClickAddToFavourite = async (id) => {
    await api.put(`/insights/addToFavourite?id=${id}`);
    setRefresh(refresh + 1);
  };
  const removeFromFavourites = async (id) => {
    await api.put(`/insights/removeFromFavourites?id=${id}`);
    console.log("working");
    setRefresh(refresh + 1);
  };
  return (
    <>
      {loading ? (
        <Grid container marginTop={20}>
          <Grid item xs={5} md={5} sm={5}></Grid>
          <Grid item xs={2} md={2} sm={2}>
            <LoadingCircle />
          </Grid>
          <Grid item xs={5} md={5} sm={5}></Grid>
        </Grid>
      ) : (
        <Grid container>
          <Grid item xs={12} md={12} sm={12}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Url</TableCell>
                  <TableCell>Words Count</TableCell>
                  <TableCell>Favourite</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {previousInsights?.map((insights, i) => (
                  <TableRow key={i}>
                    <TableCell>{insights?.url}</TableCell>
                    <TableCell>{insights?.wordsLength}</TableCell>
                    <TableCell>{insights?.favourite ? "Yes" : "No"}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleClickInsights(insights?._id)}
                        variant="contained"
                      >
                        Insights
                      </Button>
                      <Button onClick={() => handleClickDelete(insights?._id)}>
                        Delete
                      </Button>
                      {insights?.favourite ? (
                        <Button
                          onClick={() => removeFromFavourites(insights?._id)}
                        >
                          Remove From Favourites
                        </Button>
                      ) : (
                        <Button
                          onClick={() =>
                            handleClickAddToFavourite(insights?._id)
                          }
                        >
                          Add to Favourites
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default PreviousInsights;

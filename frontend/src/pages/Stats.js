import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { API_URL } from "../utils/constants.js";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  card: {
    height: "100%",
  },
  cardHeader: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  chartContainer: {
    height: 300,
  },
  centerText: {
    textAlign: "center",
    marginTop: theme.spacing(2),
  },
}));

const StatsDashboard = () => {
  const classes = useStyles();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${API_URL}stats/divecenters`);
        setStats(response.data.stats);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className={classes.centerText}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className={classes.centerText}>
        <Typography color="error">{`Error: ${error}`}</Typography>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {/* Total Dive Centers */}
        {/* Dive Centers by Country */}


        {/* Dive Centers with and without Email */}
        <Grid item xs={12} md={6} lg={4}>
          <Card className={classes.card}>
            <CardHeader
              title="Dive Centers with Email"
              className={classes.cardHeader}
            />
            <CardContent>
              <Typography variant="h4" align="center">
                {stats.diveCentersWithEmail}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card className={classes.card}>
            <CardHeader
              title="Dive Centers without Email"
              className={classes.cardHeader}
            />
            <CardContent>
              <Typography variant="h4" align="center">
                {stats.diveCentersWithoutEmail}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Dive Centers with and without Phone */}
        <Grid item xs={12} md={6} lg={4}>
          <Card className={classes.card}>
            <CardHeader
              title="Dive Centers with Phone"
              className={classes.cardHeader}
            />
            <CardContent>
              <Typography variant="h4" align="center">
                {stats.diveCentersWithPhone}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card className={classes.card}>
            <CardHeader
              title="Dive Centers without Phone"
              className={classes.cardHeader}
            />
            <CardContent>
              <Typography variant="h4" align="center">
                {stats.diveCentersWithoutPhone}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Requests */}
        <Grid item xs={12} md={6} lg={4}>
          <Card className={classes.card}>
            <CardHeader
              title="Total Requests"
              className={classes.cardHeader}
            />
            <CardContent>
              <Typography variant="h4" align="center">
                {stats.totalRequests}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Requests by Status */}
        <Grid item xs={12} md={6} lg={4}>
          <Card className={classes.card}>
            <CardHeader
              title="Requests by Status"
              className={classes.cardHeader}
            />
            <CardContent>
              <ul>
                {stats.requestsByStatus.map((status) => (
                  <li key={status._id}>
                    {status._id}: {status.count}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Grid>

        {/* Most Frequent Equipment Rented */}
        <Grid item xs={12} md={6} lg={4}>
          <Card className={classes.card}>
            <CardHeader
              title="Most Frequent Equipment Rented"
              className={classes.cardHeader}
            />
            <CardContent>
              <Typography variant="h4" align="center">
                {stats.frequentEquipementRent}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Average Number of Divers per Request */}
        <Grid item xs={12} md={6} lg={4}>
          <Card className={classes.card}>
            <CardHeader
              title="Average Number of Divers per Request"
              className={classes.cardHeader}
            />
            <CardContent>
              <Typography variant="h4" align="center">
                {stats.numberOfDiversPerRequest.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={8}>
          <Card className={classes.card}>
            <CardHeader
              title="Dive Centers by Country"
              className={classes.cardHeader}
            />
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats.diveCentersByCountry} layout="vertical">
                  <XAxis type="number" />
                  <YAxis dataKey="_id" type="category" />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3f51b5" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>         
      </Grid>
    </div>
  );
};

export default StatsDashboard;
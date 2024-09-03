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
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    background: 'url(<path-to-image>) lightgray 0.175px -153.053px / 100% 261.134% no-repeat',
  },
  card: {
    height: "100%",
    borderRadius: '8px 8px 0px 0px',
  },
  cardHeader: {
    backgroundColor: "#2D4452",
    color: theme.palette.primary.contrastText,
    borderRadius: '8px 8px 0px 0px',
  },
  chartContainer: {
    height: 300,
  },
  centerText: {
    textAlign: "center",
    marginTop: theme.spacing(2),
  },
  button: {
    backgroundColor: "#4E9FFF",
    color: "#FFFFFF",
    '&:hover': {
      backgroundColor: "#4E9FFF",
    },
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

  // Colors for the pie chart segments, matching your secondary colors
  const COLORS = ["#FBE080", "#C3DDFF", "#4E9FFF"];

  return (
    <section className="bg-gray-700 mt-8 sm:mt-4">
    <div className="container mx-auto px-3 sm:px-6 sm:py-20 ">
    <div className={classes.root}>
      <Grid container spacing={3}>

        {/* Dive Centers with Email */}
        <Grid item xs={12} md={3} lg={3}>
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

        {/* Dive Centers without Email */}
        <Grid item xs={12} md={3} lg={3}>
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

        {/* Dive Centers with Phone */}
        <Grid item xs={12} md={3} lg={3}>
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

        {/* Dive Centers without Phone */}
        <Grid item xs={12} md={3} lg={3}>
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
        <Grid item xs={12} md={3} lg={3}>
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

        {/* Average Number of Divers per Request */}
        <Grid item xs={12} md={3} lg={3}>
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

        {/* Requests Over Time Line Chart */}
        <Grid item xs={12} md={12} lg={8}>
          <Card className={classes.card}>
            <CardHeader
              title="Requests Over Time"
              className={classes.cardHeader}
            />
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={stats.requestsOverTime}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        {/* Requests by Status with Circle Chart and Legend */}
        <Grid item xs={12} md={4} lg={4}>
          <Card className={classes.card}>
            <CardHeader
              title="Dive centers by agency "
              className={classes.cardHeader}
            />
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={stats.requestsByStatus}
                    dataKey="count"
                    nameKey="_id"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {stats.requestsByStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Most Frequent Equipment Rented */}
        <Grid item xs={12} md={3} lg={3}>
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
        {/* Dive Centers by Country */}
        <Grid item xs={12} md={6} lg={6}>
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
                    {/* Dive Centers by Language */}
                    <Grid item xs={12} md={3} lg={3}>
              <Card className={classes.card}>
                <CardHeader
                  title="Dive Centers by Language"
                  className={classes.cardHeader}
                />
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={stats.diveCentersByLanguage}
                        dataKey="count"
                        nameKey="_id"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                      >
                        {stats.diveCentersByLanguage.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
                    {/* Dive Centers by Agency */}
                    <Grid item xs={12} md={6} lg={6}>
              <Card className={classes.card}>
                <CardHeader
                  title="Dive Centers by Agency"
                  className={classes.cardHeader}
                />
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={stats.diveCentersByAgency} layout="vertical">
                      <XAxis type="number" />
                      <YAxis dataKey="_id" type="category" />
                      <Tooltip />
                      <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

                {/* Requests by Status with Circle Chart and Legend */}
                <Grid item xs={12} md={3} lg={3}>
          <Card className={classes.card}>
            <CardHeader
              title="Requests by Status"
              className={classes.cardHeader}
            />
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={stats.requestsByStatus}
                    dataKey="count"
                    nameKey="_id"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {stats.requestsByStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
      </div>
    </div>
    </section>  
  );
};

export default StatsDashboard;
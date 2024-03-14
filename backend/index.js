const express = require('express');
const app = express();
const divingCenterRoutes = require('./diving-center-management/routes');
const divingAssociationRoutes = require('./diving-association-management/routes');
const userRoutes = require('./user-management/routes');

app.use(express.json());
app.use('/api/diving-center', divingCenterRoutes);
app.use('/api/diving-association', divingAssociationRoutes);
app.use('/api/user', userRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
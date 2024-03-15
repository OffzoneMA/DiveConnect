const express = require('express');
const app = express();
const divingCenterRoutes = require('./routes/diving-center');
const divingAssociationRoutes = require('./routes/diving-association');
const userRoutes = require('./routes/user');

app.use(express.json());
app.use('/api/diving-center', divingCenterRoutes);
app.use('/api/diving-association', divingAssociationRoutes);
app.use('/api/user', userRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
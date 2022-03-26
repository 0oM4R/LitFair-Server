const express = require('express');
const app = express();
// enable CORS for all routes
const cors = require('cors');
app.use(cors());

//cookies parse
const cookies = require('cookie-parser');
app.use(cookies())
require('dotenv').config();
app.use(express.json());

const testConnection = require('./DB/SQL.config').testConnection;
testConnection();

const {UserRoutes} = require('./services/User/userRoutes.routes');
const {SeekerRoutes} = require('./services/Seeker/seeker.routes')

app.use(UserRoutes);
app.use(SeekerRoutes);
app.get('/', (req, res) => {
  res.send('Home');
});

app.listen(process.env.PORT || 3000);

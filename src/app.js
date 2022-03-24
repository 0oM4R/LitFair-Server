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

const router = require('./services/User/userRoutes.routes');
app.use(router);

app.get('/', (req, res) => {
  res.send('Home');
});

app.listen(process.env.PORT || 3000);

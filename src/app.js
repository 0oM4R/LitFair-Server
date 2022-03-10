const express = require('express');
const app = express();
const router = require('./authentication/userRoutes.routes');
require('dotenv').config();
const creatTable = require('./authentication/auth.DB').creatTable;
const testConnection = require('./authentication/auth.DB').testConnection;
const MongoConnection = require('./authentication/auth.DB').connection;
app.use(express.json());
MongoConnection();
//creatTable();
testConnection();
app.use(router);
app.get('/', (req, res) => {
  res.send('Home');
});

app.listen(process.env.PORT);

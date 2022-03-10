const express = require('express');
const app = express();
// enable CORS for all routes 
const cors = require('cors')
app.use(cors())

require('dotenv').config();
app.use(express.json());

const testConnection = require('./authentication/auth.DB').testConnection;
testConnection();


const router = require('./authentication/userRoutes.routes');
app.use(router);

app.get('/', (req, res) => {
  res.send('Home');
});

app.listen(process.env.PORT || 3000);

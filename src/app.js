const express = require('express');
const app = express();
const router= require('./authentication/userRoutes.routes');
require('dotenv').config();
const creatTable =require('./authentication/auth.MySql').creatTable;
const testConnection =require('./authentication/auth.MySql').testConnection;
app.use(express.json());
//creatTable();
testConnection()
app.use(router)
app.get('/', (req, res) => {
    res.send("Home")
})

app.listen(process.env.PORT)
const express = require('express');
const app = express();
const router= require('./routes/userRoutes');
require('dotenv').config();
const creatTable =require('./config/DB/MySQL');
app.use(express.json());
creatTable();
app.use(router)
app.get('/', (req, res) => {
    res.send("Home")
})

app.listen(process.env.PORT)
const express = require('express');
const app = express();
// enable CORS for all routes
const cors = require('cors');
app.use(cors());

const morgan = require('morgan');
//cookies parse
const cookies = require('cookie-parser');
app.use(cookies())
require('dotenv').config();
app.use(express.json());
//app.use(morgan("dev"));
const testConnection = require('./DB/SQL.config').testConnection;
testConnection();

const {UserRoutes} = require('./services/User/userRoutes.routes');
const {SeekerRoutes} = require('./services/Seeker/seeker.routes')
app.use((req,res,next)=>{
 
 const os =(req)=>{
  const agent=req.get("user-agent")
   if(agent.search("Win64")!= -1){
     return "Windows";
   }else if(agent.search("Android")!=-1){
    return "Android";
   }else if(agent.search("iPhone OS")){
     return "iOS";
   }

 }
 
  time = new Date(); 
  timeF=time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds() 
  console.table({
    sourceIp:req.socket.remoteAddress,
    route:req.path,time:timeF,
    os:os(req)
  });
  console.log(req.get("user-agent"))
  console.log("#################################")
  next()})
app.use(UserRoutes);
app.use(SeekerRoutes);

app.get('*', (req, res) => {


  res.send({msg:"hi anyone"});
});

app.listen(process.env.PORT || 3000);

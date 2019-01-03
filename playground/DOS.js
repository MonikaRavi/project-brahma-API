// const express=require('express');
// var app=express();

// var bodyParser = require('body-parser');   //required for POST requests? 
// app.use(bodyParser.urlencoded({ extended: false }));

// var cors = require('cors');
// app.use(cors());

// app.post('/api',(req,res)=>{
// 	const payload=req.body;
// 	// console.dir(req.body);
// 	console.log(`Processing: ${payload}`);
// 	//res.send(req.body);
// })

// app.listen(3000, function() {
//   console.log(`Server started at port 3000..`);
// });

const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');
const port = 3000;
const server = restify.createServer();
const bunyan = require('bunyan');

const cors = corsMiddleware({
  origins: ['*'],
});

server.server.maxConnections=20;

server.use(restify.plugins.bodyParser());
server.pre(cors.preflight);
server.use(cors.actual);

server.post('/api', (req, res) => {
  const payload = req.body;
  console.log(`Processing: ${payload}`);
  // setTimeout(()=>{
  // 	res.send(`done${payload}`);
  // },1000) 
  res.send(`done${payload}`);
});

server.listen(port, () => console.info(`Server is up on ${port}.`));
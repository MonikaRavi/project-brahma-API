var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var favicon = require('serve-favicon');
var path = require('path');

var viewPath = __dirname + '/public/';

var sfData = require('./Salesforce/Query/accounts');
var aggregateData=require('./aggregate.js');
var intersection=require('./intersection.js');
var list=require('./list.js');
var customer=require('./customer.js');


var app = express();
app.use(cors());


const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(favicon(path.join(__dirname, '/public', 'favicon.ico')));

app.get('/', (req, res) => {

  res.sendFile(viewPath + "home.html");

});


// get Accounts by distributor type

app.get('/data/:type', (req, res) => {


  sfData.accounts(req.params.type).then(

    (data) => {

      res.send(JSON.stringify(data, undefined, 2));
      // console.log({data});
    },
    (err) => {
      res.status(400).send(err);
    }

  ).catch((err) => {
    res.status(400).send(err);
  })


});

// get the opportunity by AX account no

app.get('/opportunity/:account', (req, res) => {

  console.log(req.params.account);
  
  aggregateData.aggregateData(req.params.account).then((data)=>{
  
    console.log(data);  
    res.send(data);
  
  },(error)=>{  
    res.send(error);
  });

})


//get detailed information for certain orders present in SF that made it into AX
app.get('/intersection/:salesOrder',(req,res)=>{
  //console.log(req.params.account);
  intersection.intersection(req.params.account).then((result)=>{
  console.log('data:',result);
  res.send(result);
 });
  
});


app.get('/list',(req,res)=>{
  list.listFunc().then((result)=>{
    //console.log('List:',result);
    res.send(result);
  })
})

app.get('/customerDetail/:account',(req,res)=>{
  customer.customer(req.params.account).then((result)=>{
    //console.log('Customer Details:',result);
    res.send(result);
  })
});






app.listen(3000, () => {

  console.log(`Server started at port 3000..`);

});





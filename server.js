var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var favicon = require('serve-favicon');
var path = require('path');

var viewPath = __dirname + '/public/';

var sfData = require('./Salesforce/Query/accounts');
var aggregateData=require('./aggregate.js');


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
  // aggregateData.aggregateData(req,res).then(function(values){
  //    //console.log('values inside:',values);
  //    var sf={'salesforce':values}
  //    console.log('Values[0]',sf);
  //    var a65={
  //                         "customer":{
  //                                       "CustAccount":req.params.account,
  //                                       "Customer":"Some random name for now"
  //                                   },
  //                         "data":values[1]
  //                     }
   
  //    console.log('Values[1]',a65);


  //    res.send({'salesforce':values[0],'AX365':a65
  //    });
  //    });
})


app.listen(port, () => {
  console.log(`Server started at port ${port}..`);
});





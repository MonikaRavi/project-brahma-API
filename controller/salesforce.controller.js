var express=require('express');
var router=express.Router();
var sfModel = require('../model/salesforce.model');


// get Accounts by distributor type

 function getAccounts(req, res) {

  sfModel.accounts(req.params.type).then(

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

};

module.exports= {
    getAccounts
}
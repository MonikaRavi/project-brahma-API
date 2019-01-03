var express=require('express');
var salesforceModel = require('../model/salesforce.model');


// get Accounts by distributor type

 function accountsByType(req, res) {

  //
  salesforceModel.getAccounts(req.params.type).then(

    function(data){

      res.send(data);

    },
    function(err) {

      console.log(err);
      
      res.status(400).send(err);
    
    }

  ).catch(function(err){
    
    res.status(400).send(err);
  
  })

};

module.exports= {
    accountsByType
}
var express=require('express');
var salesforceModel = require('../model/salesforce.model');


//get sales order details for a particular sales ID in salesforce
function salesOrderDetailsFromSalesId(req,res){
  salesforceModel.getSalesDetailsFromSalesID(req.params.salesId).then(function(result){
    // console.log(result.records);
    var tempVal=result.records[0];
    res.send([{
      name:tempVal.Name,
      qAmount:tempVal.Amount,
      so:tempVal.ERP_Sales_Order_Number__c,
      erpAmount:tempVal.ERP_Final_Amount__c,
      accountID:tempVal.AccountId,
      closeDate:tempVal.CloseDate,
      deliveryState:tempVal.Opportunity_State_Province__c
    }]);
  },function(error){
    res.send(error);
  })
}

//get opportunity for a particular customer in salesforce
function opportunity(req,res){
  salesforceModel.getOpportunity(req.params.account).then(function(result){
    res.send(result);
  },function(error){
    res.send(error);
  })
}

// get Accounts by distributor type
function accountsByType(req, res) {

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
    accountsByType,
    salesOrderDetailsFromSalesId,
    opportunity
}
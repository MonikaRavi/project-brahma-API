var express=require('express');
var salesforceModel = require('../model/salesforce.model');


//get sales order details for a particular sales ID in salesforce
function salesOrderDetailsFromSalesId(req,res){
  salesforceModel.getSalesDetailsFromSalesID(req.params.salesId).then(function(result){
    // if(result.records[0].length)

    var tempVal=result.records[0];
    if(tempVal!==undefined){
      res.send([{
      name:tempVal.Name,
      qAmount:tempVal.Amount,
      so:tempVal.ERP_Sales_Order_Number__c,
      erpAmount:tempVal.ERP_Final_Amount__c,
      accountID:tempVal.AccountId,
      closeDate:tempVal.CloseDate,
      deliveryState:tempVal.Opportunity_State_Province__c
    }]);
    }else{
      res.status(400).send({
        status: 200,
        errorMessage:'No records could be found for this salesId, please retry with another SalesId.'
      })
    }    
  },function(error){
    res.status(400).send(error);
  })
}

//get opportunity for a particular customer in salesforce
function opportunity(req,res){
  salesforceModel.getOpportunity(req.params.account).then(function(result){
    if(result.length!==0){
      res.send(result);
    }else{
      res.status(400).send({
        status: 200,
        errorMessage:'No records could be found for this salesId, please retry with another customer Account.'
      });
    }
    
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
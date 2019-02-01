// var express = require('express');
var salesforceModel = require('../model/salesforce.model');


//get sales order details for a particular sales ID in salesforce
function salesOrderDetailsFromSalesId(req,res){

    salesforceModel.getSalesDetailsFromSalesID(req.params.salesId).then(function(result){
    // if(result.records[0].length)

        var tempVal = result.records[0];
        if(typeof tempVal != "undefined"){
          
            res.send([{
                name : tempVal.Name,
                qAmount : tempVal.Amount,
                so : tempVal.ERP_Sales_Order_Number__c,
                erpAmount : tempVal.ERP_Final_Amount__c,
                accountID : tempVal.AccountId,
                closeDate : tempVal.CloseDate,
                deliveryState : tempVal.Opportunity_State_Province__c
            
            }]);
        
        }else{
        
            res.status(200).send([]);
        
        }    
      
    },function(error){
      
        res.status(400).send({
        
                status : 400,
                errorMessage :'Bad Request!'
        
            });
      
    })

}

//get opportunity for a particular customer in salesforce
function opportunity(req,res){
  
    salesforceModel.getOpportunity(req.params.Account).then(function(result){
        console.log('typeof result:',typeof result[0]);
        if(typeof result[0] != 'undefined'){
  
            res.send(result);
  
        }else{
  
            res.status(200).send([]);
  
        }
    
    },function(error){
  
        res.status(400).send({
        
                status : 400,
                errorMessage :'Bad Request!'
        
            });
  
    })

}

// get Accounts by distributor type
function accountsByType(req, res) {

  salesforceModel.getAccounts(req.params.Type).then(

    function(data){

      res.send(data);

    },
    function(err) {

      res.status(200).send([]);
    
    }

    ).catch(function(err){
    
    res.status(400).send({
        
                status : 400,
                errorMessage :'Bad Request!'
        
            });
  
    })

  };




module.exports = {

    accountsByType,
    salesOrderDetailsFromSalesId,
    opportunity

}
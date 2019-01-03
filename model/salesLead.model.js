// const sfConnection = require('../configuration/accessSF');
const config=require('../configuration/configAX2009.js');
const utilityModel=require('./utility/utilityModel');
const sql=require('mssql');

//get sales order for a particular sales ID
var getSalesOrder=function(salesId){ //getSalesOrder

    var ourQuery = `select SALESID, SalesName, createdDate, Amount from SalesSummary_Hws where SALESID = '${salesId}'`;
    
    var config1=config.config;

    return utilityModel.sqlQuery(ourQuery,config1);

}


//get sales order details related to a sales order
var getSalesDetails=function(salesId){ //getSalesDetails

    var ourQuery=`select name, Amount, ERP_Sales_Order_Number__c, ERP_Final_Amount__c, AccountID, CloseDate, 
                                Opportunity_State_Province__c from Opportunity where ERP_Sales_Order_Number__c = '${salesId}' `;

    return utilityModel.SFQuery(ourQuery);

}

module.exports={
	getSalesDetails,
	getSalesOrder
}
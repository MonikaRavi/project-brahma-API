// const sfConnection = require('../configuration/accessSF');
const config=require('../configuration/configAX2009.js');
const utilityModel=require('./utility/utilityModel');
const sql=require('mssql');

var AX2009Func=function(){

    var ourQuery = `select SALESID, SalesName, createdDate, Amount from SalesSummary_Hws where SALESID = 'SO-1787116'`;
    
    var config1=config.config;

    return utilityModel.sqlQuery(ourQuery,config1);

}

var SFFunc=function(){

    var ourQuery=`select name, Amount, ERP_Sales_Order_Number__c, ERP_Final_Amount__c, AccountID, CloseDate, 
                                Opportunity_State_Province__c from Opportunity where ERP_Sales_Order_Number__c = 'SO-1787116' `;

    return utilityModel.SFQuery(ourQuery);

}

module.exports={
	SFFunc,
	AX2009Func
}
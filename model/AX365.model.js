
const config365 = require('../configuration/configAX365.js');
const utilityModel = require('./utility/utilityModel');

//get sales order related to a particular customer
function getSalesOrderByCustomer(account){//salesOrderByCustomer

    var config = config365.config;

    var ourQuery = `select top 5 SalesID, createdDate,Amount, CustAccount, Customer from SalesSummary_Avlis where CustAccount='${account}' order by createdDate desc`;
  
  // return utilityModel.sqlQuery(ourQuery,config);
    return new Promise(function(resolve,reject){

  	    utilityModel.sqlQuery(ourQuery,config).then(function(result){
  	
    	   resolve(result);
  
        },function(error){
  
  		    reject(error);
  
  	    });
  
    }); 
  	
}

function getSalesOrderList(){

    var config = config365.config;

    var ourQuery = `SELECT TOP  50 SalesID
          ,Amount
          ,createdDate
          ,CustAccount
          ,Customer
          ,SalesStatus
        FROM dbo.vSalesSummary order by createdDate desc`;
  
  // return utilityModel.sqlQuery(ourQuery,config);
    return new Promise(function(resolve,reject){

        utilityModel.sqlQuery(ourQuery,config).then(function(result){
    
           resolve(result);
  
        },function(error){
  
            reject(error);
  
        });
  
    });  

}

function getCustomerDetailsFromSalesId(salesId){

    var config = config365.config;

    var ourQuery = `SELECT CUSTACCOUNT
      ,CUSTOMER
      ,FULLPRIMARYADDRESS
      ,ADDRESSSTREET
      ,ADDRESSCITY
      ,ADDRESSDISTRICTNAME
      ,ADDRESSSTATE
      ,ADDRESSZIPCODE
      ,ADDRESSDESCRIPTION
      ,PRIMARYCONTACTPHONE
      ,PRIMARYCONTACTEMAIL
  FROM dbo.vSales_CustomerDetail WHERE SALESID = '${salesId}'`;
  
  // return utilityModel.sqlQuery(ourQuery,config);
    return new Promise(function(resolve,reject){

        utilityModel.sqlQuery(ourQuery,config).then(function(result){
    
           resolve(result);
  
        },function(error){
  
            reject(error);
  
        });
  
    });  
}


function getSalesOrderDetailsFromSalesId(salesId){
    var config = config365.config;

    var ourQuery = `SELECT  SALESID
      ,BOOKEDDATE
      ,ITEMID
      ,LINEAMOUNT
      ,ITEMNAME
      ,SALESNAME
      ,QTY
      ,SALESSTATUS
  FROM dbo.vSalesDetail WHERE SALESID = '${salesId}'`;
  
  // return utilityModel.sqlQuery(ourQuery,config);
    return new Promise(function(resolve,reject){

        utilityModel.sqlQuery(ourQuery,config).then(function(result){
    
           resolve(result);
  
        },function(error){
  
            reject(error);
  
        });
  
    });
}

module.exports = {

	getSalesOrderByCustomer,
    getSalesOrderList,
    getCustomerDetailsFromSalesId,
    getSalesOrderDetailsFromSalesId


}

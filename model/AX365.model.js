
const config365=require('../configuration/configAX365.js');
const utilityModel=require('./utility/utilityModel');

//get sales order related to a particular customer
function getSalesOrderByCustomer(account){//salesOrderByCustomer

  var config=config365.config;

  var ourQuery = `select top 5 SalesID, createdDate,Amount, CustAccount, Customer from SalesSummary_Avlis where CustAccount='C000622' order by createdDate desc`;
  
  // return utilityModel.sqlQuery(ourQuery,config);
  return new Promise(function(resolve,reject){
  	utilityModel.sqlQuery(ourQuery,config).then(function(result){
  		resolve(result);
  },function(error){
  		reject(error);
  	});
  }); 
  	
}


module.exports={

	getSalesOrderByCustomer
	// getCustomerDetailsBySalesId
}
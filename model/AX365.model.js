
const config365=require('../configuration/configAX365.js');
const utilityModel=require('./utility/utilityModel');


function accountAX365Func(account){

  var config=config365.config;

  var ourQuery = `select top 5 SalesID, createdDate,Amount, CustAccount, Customer from SalesSummary_Avlis where CustAccount='C000622' order by createdDate desc`
  
  return utilityModel.sqlQuery(ourQuery,config);
  	
}

module.exports={

	accountAX365Func

}
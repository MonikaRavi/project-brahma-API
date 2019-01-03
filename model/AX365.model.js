
const config365=require('../configuration/configAX365.js');
const utilityModel=require('./utility/utilityModel');


function getSalesOrderByCustomer(account){//salesOrderByCustomer

  var config=config365.config;

  var ourQuery = `select top 5 SalesID, createdDate,Amount, CustAccount, Customer from SalesSummary_Avlis where CustAccount='C000622' order by createdDate desc`
  
  return utilityModel.sqlQuery(ourQuery,config);
  	
}

function getCustomerDetailsBySalesId(salesId){


	var config=config365.config;
	
	return new Promise(function(resolve,reject){
		var ourQuery=`SELECT dbo.CustCustomerV2Staging.CUSTOMERACCOUNT, dbo.CustCustomerV2Staging.ORGANIZATIONNAME, dbo.CustCustomerV2Staging.FULLPRIMARYADDRESS, 
                         dbo.CustCustomerV2Staging.PRIMARYCONTACTEMAIL, dbo.CustCustomerV2Staging.PRIMARYCONTACTPHONE, dbo.SalesOrderHeaderV2Staging.SALESORDERNUMBER
                        
					FROM dbo.CustCustomerV2Staging 
					CROSS JOIN
                         dbo.SalesOrderHeaderV2Staging
                    WHERE dbo.SalesOrderHeaderV2Staging.ORDERINGCUSTOMERACCOUNTNUMBER=dbo.CustCustomerV2Staging.CUSTOMERACCOUNT 
						 AND dbo.SalesOrderHeaderV2Staging.SALESORDERNUMBER='${salesId}'`;

		resolve (utilityModel.sqlQuery(ourQuery,config));
	})

	
}

module.exports={

	getSalesOrderByCustomer,
	getCustomerDetailsBySalesId
}
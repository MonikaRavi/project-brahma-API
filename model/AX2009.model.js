const sql = require('mssql');
const config = require('../configuration/configAX2009.js');
const utilityModel = require('./utility/utilityModel');
var config09 = config.config;

//get recent sales order list from AX2009
var getSalesOrderList = function(){
    var value = '';
    var ourQuery = `SELECT [SALESID]
      ,[Amount]
      ,[createdDate]
      ,[CUSTACCOUNT]
      ,[Customer]
      ,[SALESNAME]
      ,[RecentPickUp]
      ,[Status]
      ,[SF]
      FROM View_NodeSalesList`;
    var config1 = config.config;

    return utilityModel.sqlQuery(ourQuery,config1,value);
}

//gets customer details from sales id
function getCustomerDetailsFromSalesId(req,res){ //get customer from sales

    var salesId = req.params.salesId;

    var value = salesId;

    var ourQuery = `select SALESID, CUSTACCOUNT , Customer, PHONE, EMAIL, ADDRESS, RSD from Customer_SalesID where SALESID = '${salesId}'`;

    return utilityModel.sqlQuery(ourQuery,config09,salesId);
}

//gets sales order details for a particular sales ID in AX 2009
function getSalesOrderDetailsFromSalesId(salesId){
    var value = salesId;

    var ourQuery = "select distinct sales_TB.SALESID, SALESNAME, CREATEDDATETIME, Customer, ITEMID ,ITEMNAME, SALESQTY , LINEAMOUNT, SalesStatus from SalesDetail_hws sales_TB  WHERE sales_TB.SALESID=@value";

    return utilityModel.sqlQuery(ourQuery,config09,value);
}

//gets sales information for a particular customer  //used in aggregate and opportunity
function getSalesFromCustomer(req,res){//get sales from customer

    var account = req.params.Account;
    var value = account;

    var ourQuery = 'select top 5 SalesID, createdDate,Amount,CustAccount, Customer from SalesSummary_Hws where CustAccount = @value order by createdDate desc';

    return utilityModel.sqlQuery(ourQuery,config09,account);

}

function getOnHand(itemId){
    var ourQuery=`SELECT [ITEMID]
      ,[ITEMNAME]
      ,[CONFIGID]
      ,[ItemGroup]
      ,[Total Available]
      ,[CostPrice]
      ,[LeadTimePurchase]
      ,[HEIGHT]
      ,[WIDTH]
      ,[DEPTH]
      ,[MFGCATEGORY]
      ,[NETWEIGHT]
  FROM [InventOnHand_Std] where ITEMID = '${itemId}'`;

    return utilityModel.sqlQuery(ourQuery,config09);



}

module.exports={
	getSalesFromCustomer,
  getCustomerDetailsFromSalesId,
  getSalesOrderList,
  getSalesOrderDetailsFromSalesId,
  getOnHand
}
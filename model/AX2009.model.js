const sql=require('mssql');
const config=require('../configuration/configAX2009.js');
const utilityModel=require('./utility/utilityModel');
var config09=config.config;

//gets sales information for a particular customer
function getSalesFromCustomer(req,res){//get sales from customer

    var account=req.params.account;
    var value=account;

    var ourQuery = 'select top 5 SalesID, createdDate,Amount,CustAccount, Customer from SalesSummary_Hws where CustAccount = @value order by createdDate desc';

    return utilityModel.sqlQuery(ourQuery,config09,account);

}

//gets customer details from sales id
function getCustomerDetailsFromSales(req,res){ //get customer from sales

    var salesId=req.params.salesId;

    var value=salesId;

    var ourQuery = `select SALESID, CUSTACCOUNT , Customer, PHONE, EMAIL, ADDRESS, RSD from Customer_SalesID where SALESID = '${salesId}'`;

    return utilityModel.sqlQuery(ourQuery,config09,salesId);
}

//gets sales order list from Salesforce that made it to AX2009
function getSalesOrderList(req,res){   

    var value='';
    var ourQuery = `select distinct A.SALESID, SALESNAME, CREATEDDATETIME, Customer, 

                                ITEMID ,ITEMNAME, SALESQTY , LINEAMOUNT, SalesStatus

                                from SalesDetail_hws A join temp_SOSF B on A.SALESID = B.SALESID`;
  
    return utilityModel.sqlQuery(ourQuery,config09,value);
}

function getSalesOrderDetailsFromSalesId(salesId){
    var value=salesId;

    var ourQuery = "select distinct A.SALESID, SALESNAME, CREATEDDATETIME, Customer, ITEMID ,ITEMNAME, SALESQTY , LINEAMOUNT, SalesStatus from SalesDetail_hws A join temp_SOSF B on A.SALESID = B.SALESID WHERE A.SALESID=@value";

    return utilityModel.sqlQuery(ourQuery,config09,value);
}

var getSalesOrderListNew=function(){
    var value='';
    //var ourQuery = `select SALESID, SalesName, createdDate, Amount from SalesSummary_Hws`;
    var ourQuery=`select [SALESID]
      ,[Amount]
      ,[createdDate]
      ,[CUSTACCOUNT]
      ,[Customer]
      ,[SALESNAME]
      ,[RecentPickUp] from SalesSummary_Hws where YEAR(RecentPickUp) = 2019`;
    var config1=config.config;

    return utilityModel.sqlQuery(ourQuery,config1,value);
}


module.exports={
	getSalesFromCustomer,
    getCustomerDetailsFromSales,
    getSalesOrderList,
    getSalesOrderListNew,
    getSalesOrderDetailsFromSalesId
}
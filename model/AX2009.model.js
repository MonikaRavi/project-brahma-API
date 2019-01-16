const sql=require('mssql');
const config=require('../configuration/configAX2009.js');
const utilityModel=require('./utility/utilityModel');
var config09=config.config;

//gets sales information for a particular customer  //used in aggregate and opportunity
function getSalesFromCustomer(req,res){//get sales from customer

    var account=req.params.account;
    var value=account;

    var ourQuery = 'select top 5 SalesID, createdDate,Amount,CustAccount, Customer from SalesSummary_Hws where CustAccount = @value order by createdDate desc';

    return utilityModel.sqlQuery(ourQuery,config09,account);

}

//gets customer details from sales id
function getCustomerDetailsFromSalesId(req,res){ //get customer from sales

    var salesId=req.params.salesId;

    var value=salesId;

    var ourQuery = `select SALESID, CUSTACCOUNT , Customer, PHONE, EMAIL, ADDRESS, RSD from Customer_SalesID where SALESID = '${salesId}'`;

    return utilityModel.sqlQuery(ourQuery,config09,salesId);
}

function getSalesOrderDetailsFromSalesId(salesId){
    var value=salesId;

    var ourQuery = "select distinct A.SALESID, SALESNAME, CREATEDDATETIME, Customer, ITEMID ,ITEMNAME, SALESQTY , LINEAMOUNT, SalesStatus from SalesDetail_hws A join temp_SOSF B on A.SALESID = B.SALESID WHERE A.SALESID=@value";

    return utilityModel.sqlQuery(ourQuery,config09,value);
}

var getSalesOrderList=function(){
    var value='';
    var ourQuery=`select * from SalesSummary_Hws A INNER JOIN
                      dbo.temp_SOSF AS E ON A.SALESID = E.SalesID`;
    var config1=config.config;

    return utilityModel.sqlQuery(ourQuery,config1,value);
}


module.exports={
	getSalesFromCustomer,
  getCustomerDetailsFromSalesId,
  getSalesOrderList,
  getSalesOrderDetailsFromSalesId
}
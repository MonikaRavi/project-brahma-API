const sql=require('mssql');
const config=require('../configuration/configAX2009.js');
const utilityModel=require('./utility/utilityModel');
var config09=config.config;


function accountAX2009Func(req,res){

    var account=req.params.account;
    var value=account;

    var ourQuery = 'select top 5 SalesID, createdDate,Amount,CustAccount, Customer from SalesSummary_Hws where CustAccount = @value order by createdDate desc';

    return utilityModel.sqlQuery(ourQuery,config09,account);

}

function customerFunc(req,res){

    var salesId=req.params.salesId;

    var value=salesId;

    var ourQuery = "select TOP 10 SALESID, CUSTACCOUNT , Customer, PHONE, EMAIL, ADDRESS, RSD from Customer_SalesID where SALESID = @value";

    return utilityModel.sqlQuery(ourQuery,config09,salesId);
}

function listFunc(req,res){

    var value='';
    var ourQuery = `select distinct A.SALESID, SALESNAME, CREATEDDATETIME, Customer, 

                                ITEMID ,ITEMNAME, SALESQTY , LINEAMOUNT, SalesStatus

                                from SalesDetail_hws A join temp_SOSF B on A.SALESID = B.SALESID`;
  
    return utilityModel.sqlQuery(ourQuery,config09,value);
}


module.exports={
	accountAX2009Func,
    customerFunc,
    listFunc
}
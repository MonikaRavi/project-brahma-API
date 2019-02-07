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


function getInvoiceDetail(salesId){

  var ourQuery=`SELECT INVOICEID, INVOICEDATE, ITEMID , ITEMNAME , SALESQTY, LINEAMOUNT ,UnitPrice, DISCOUNT

    FROM SalesInvoice_Commission_Detail 

    WHERE SALESID='${salesId}' GROUP BY INVOICEID,INVOICEDATE, ITEMID, ITEMNAME, SALESQTY,LINEAMOUNT,UnitPrice,Discount`;

    return utilityModel.sqlQuery(ourQuery,config09);
}

function getSalesHeaders(salesId){

  var ourQuery=`SELECT DISTINCT SALESID, INVOICEACCOUNT, SALESGROUP, DELIVERYNAME , DELIVERYADDRESS , InvoiceToAddress, InvoiceCustomer, CustomerPO

      FROM SalesInvoice_Commission_Detail WHERE SalesID='${salesId}'`;  

      return utilityModel.sqlQuery(ourQuery,config09);
}

function getCommissionDetails(salesId){

  var ourQuery=`SELECT INVOICEID, INVOICEDATE, REPID, REP,SUM(AMOUNTMST) AS Amount, CURRENCYCODE,CommissionDate 

      FROM SalesInvoice_Commission_Detail 

      WHERE SALESID='${salesId}' GROUP BY INVOICEID,INVOICEDATE,REPID, REP, CURRENCYCODE, COMMISSIONDATE`; 

      return utilityModel.sqlQuery(ourQuery,config09);
}

var getCommissionAndInvoiceDetails=async function(salesId){
  var ourQuery=`SELECT INVOICEID, INVOICEDATE, REPID, REP,SUM(AMOUNTMST) AS Amount, CURRENCYCODE,CommissionDate,ITEMID , ITEMNAME , SALESQTY, LINEAMOUNT ,UnitPrice, DISCOUNT 

      FROM SalesInvoice_Commission_Detail 

      WHERE SALESID='${salesId}' GROUP BY INVOICEID,INVOICEDATE,REPID, REP, CURRENCYCODE, COMMISSIONDATE, ITEMID , ITEMNAME , SALESQTY, LINEAMOUNT ,UnitPrice, DISCOUNT`;

    var ourCommissionQuery=`SELECT 
      INVOICEID, INVOICEDATE,REPID, REP,sum(AMOUNTMST) as Amount, CURRENCYCODE, max(CommissionDate) as CommissionDate
      FROM SalesInvoice_Commission_Detail
      WHERE SALESID='${salesId}'
      GROUP BY REPID,REP,CURRENCYCODE,INVOICEID, INVOICEDATE`

    var ourInvoiceQuery=`select  --Sales headers
      INVOICEID, INVOICEDATE, ITEMID , ITEMNAME , SALESQTY, LINEAMOUNT, UnitPrice, DISCOUNT 
      FROM SalesInvoice_Commission_Detail
      WHERE SALESID='${salesId}'
      GROUP BY INVOICEID,INVOICEDATE,ITEMID,ITEMNAME,SALESQTY,LINEAMOUNT,UnitPrice,DISCOUNT`;

  // return new Promise((resolve,reject)=>{

    var commissionData;
    var invoiceData;
     // utilityModel.sqlQuery(ourCommissionQuery,config09).then((resultInvoice)=>{
     //    console.log('commision:',resultInvoice.recordsets[0]);
     //    commissionData=resultInvoice.recordsets[0];
     //  })
     //  .then(()=>{
     //    utilityModel.sqlQuery(ourInvoiceQuery,config09).then((resultCommission)=>{
     //      console.log('invoice:',resultCommission.recordsets[0]);
     //      invoiceData=resultCommission.recordsets[0];
     //    })
     //  }).then(()=>{
     //    resolve({commissionData:commissionData,
     //    invoiceData:invoiceData})
     //  })
     //  .catch((err)=>{
     //    reject(err);
     //  })

      // 
    var errorM;
   


    async function commission(){
      let promiseCommission= utilityModel.sqlQuery(ourCommissionQuery,config09);
      let commissionResult=await promiseCommission;
      return commissionResult.recordsets[0];
    }

    async function invoice(){
      let promiseInvoice= utilityModel.sqlQuery(ourInvoiceQuery,config09);
      let invoiceResult=await promiseInvoice;
      return invoiceResult.recordsets[0];
    }

    try{
     var commissionData=await commission();
     var invoiceData=await invoice();

    }catch(error){
      
      errorM=error;
    
    }
  
  return new Promise((resolve,reject)=>{

    if(errorM){
      reject(errorM);
    }else{
      resolve({commissionData:commissionData,invoiceData:invoiceData})
    }
  })
// })
}

function getInventoryList(){
  var ourQuery=`select ITEMID , ITEMNAME from InventID_MainLOB`;

  return utilityModel.sqlQuery(ourQuery,config09);

}



module.exports={
	getSalesFromCustomer,
  getCustomerDetailsFromSalesId,
  getSalesOrderList,
  getSalesOrderDetailsFromSalesId,
  getOnHand,
  getInvoiceDetail,
  getSalesHeaders,
  getCommissionDetails,
  getCommissionAndInvoiceDetails,
  getInventoryList
}
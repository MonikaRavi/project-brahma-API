const sql=require('mssql');
const config=require('./config2009.js');



function accountAX2009(){
	return new Promise((resolve,reject)=>{
        console.log("HI");
		var config1=config.config;
        console.log('config1:',config1);
      	sql.connect(config1, function (err) {    
            if (err) console.log(err);
            var request = new sql.Request();           
           /* var ourQuery=`SELECT   TOP 5  A.SALESID,
                                            SUM(A.LineAmount) as TotalAmount, B.CREATEDDATETIME, 
                            FROM dbo.ba_SalesLine as A
                            INNER JOIN
                                dbo.ba_SalesTable as B
                            ON
                                A.SALESID = B.SALESID 
                            WHERE B.CUSTACCOUNT='00764' AND A.SALESSTATUS!='4' AND A.DATAAREAID='HWS' AND A.DATAAREAID=B.DATAAREAID
                            GROUP By A.SALESID, B.CREATEDDATETIME
                            ORDER BY B.CREATEDDATETIME DESC`; */

            ourQuery = `select top 5 SalesID, createdDate,Amount,CustAccount, Customer from SalesSummary_Hws where CustAccount='00764' order by createdDate desc`


            request.query(ourQuery, function (err, recordset) {
              if (err) reject(err);
              var customer={
                CustAccount:recordset.recordsets[0][1].CustAccount,
                Customer:recordset.recordsets[0][1].Customer
                    
              };
              //console.log("((((((((((((((((( recordset:",JSON.stringify(recordset));
              resolve({customer: customer,
                data: recordset.recordsets[0]}); 
              sql.close();
            });
        });
        
	})
}


module.exports={
	accountAX2009
}
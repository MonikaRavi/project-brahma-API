const sql=require('mssql');
const config365=require('./config365.js');


function accountAX365(account){
	//console.log("hello");
	return new Promise((resolve,reject)=>{
		config=config365.config;
      	sql.connect(config, function (err) {    
            if (err) console.log(err);
            var request = new sql.Request();           
            // var ourQuery=`select top 5 B.[SALESORDERNUMBER] as SalesID, 
            // 					 	   C.[REQUESTEDRECEIPTDATE] as createdDate,
            // 					 	   sum(C.[LineAmount]) as Amount,

            // 			 FROM [AXDATA].[dbo].[SalesOrderHeaderV2Staging] as B
            // 			 Inner Join
            // 			 	[AXDATA].[dbo].[SalesOrderLineStaging] as C
            // 			 ON 
            // 			 	B.SALESORDERNUMBER=C.SALESORDERNUMBER  AND C.DATAAREAID='HWA'
            // 			 WHERE B.ORDERINGCUSTOMERACCOUNTNUMBER='C000622'
            // 			 GRoup by b.SALESORDERNUMBER,c.REQUESTEDRECEIPTDATE
            // 			 Order by b.SALESORDERNUMBER, c.REQUESTEDRECEIPTDATE`;

            var ourQuery = `select top 5 SalesID, createdDate,Amount, CustAccount, Customer from SalesSummary_Avlis where CustAccount='C000622' order by createdDate desc`

            request.query(ourQuery, function (err, recordset) {
              if (err) reject(err);

               var customer={
                CustAccount:recordset.recordsets[0][1].CustAccount,
                Customer:recordset.recordsets[0][1].Customer
                    
            	};
              //console.log("(______(( recordset:",JSON.stringify(recordset));
              resolve({customer: customer,
              	data: recordset.recordsets[0]});
              sql.close(); 
            });
        });

	})
}

module.exports={
	accountAX365
}
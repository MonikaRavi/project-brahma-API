const sql=require('mssql');
const config=require('./config2009.js');

function accountAX2009(account){

	return new Promise((resolve,reject)=>{
    
		var config1=config.config;
   
        sql.connect(config1, function (err) {    
        
            if (err) console.log(err);
            
            var request = new sql.Request();           
             
            ourQuery = `select top 5 SalesID, createdDate,Amount,CustAccount, Customer from SalesSummary_Hws where CustAccount='${account}' order by createdDate desc`

            request.query(ourQuery, function (err, recordset) {
                
                if (err) reject(err);
                
                var customer={
                                CustAccount:recordset.recordsets[0][1].CustAccount,
                                Customer:recordset.recordsets[0][1].Customer
                              };

                var tempData=[];
                recordset.recordsets[0].forEach(customer=>{
                    var tempCus={
                        SalesId:customer.SalesID,
                        createdDate:customer.createdDate,
                        Amount:customer.Amount
                    }
                    tempData.push(tempCus);
                });
                
                resolve(
                        {
                            customer: customer,
                            data: tempData
                        }
                );

                sql.close();
            
             });
        
        });
        
	})

}


module.exports={
	accountAX2009
}
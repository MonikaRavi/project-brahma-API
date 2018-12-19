const sql=require('mssql');
const config365=require('./config365.js');


function accountAX365(account){

	return new Promise((resolve,reject)=>{

    config=config365.config;
    // config={
    //     user: 'biplavt',
    //     password: 'traynor_1906',
    //     server: '13.77.146.247', 
    //     database: 'AXDATA' 
    // };
  	sql.connect(config, function (err) {    

        if (err) console.log(err);

        var request = new sql.Request();           
       
        var ourQuery = `select top 5 SalesID, createdDate,Amount, CustAccount, Customer from SalesSummary_Avlis where CustAccount='C000622' order by createdDate desc`

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

	accountAX365

}
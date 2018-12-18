const config9=require('./AX2009/config2009.js');
const sfConnection = require('./Salesforce/access');
const sql=require('mssql');

function customer(account){
	return new Promise((resolve,reject)=>{
    
			console.log('account:',account);
			var config1=config9.config;
	   
	        sql.connect(config1, function (err) {    
	        
	            if (err) console.log(err);
	            
	            var request = new sql.Request();           
	             
	            ourQuery = `select TOP 10 SALESID, CUSTACCOUNT , Customer, PHONE, EMAIL, ADDRESS, RSD from Customer_SalesID 
	            where SALESID='${account}'`;

	            request.query(ourQuery, function (err, recordset) {
	                
	                if (err) reject(err);
	            	
	            	 console.log(recordset.recordsets[0]);    

	            	resolve(recordset.recordsets[0]);      	                     
	           
	                sql.close();
	            
	             });
	        
	        });
		});
}

module.exports={
	customer
}
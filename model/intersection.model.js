const sfConnection = require('../configuration/accessSF');
const config=require('../configuration/configAX2009.js');
const sql=require('mssql');

var AX2009Func=function(){
		
	return new Promise(function(resolve,reject){

		var config1=config.config;
		
        sql.connect(config1, function (err) {    
        
            if (err) console.log(err);
            
            var request = new sql.Request();           
             
            ourQuery = `select SALESID, SalesName, createdDate, Amount from SalesSummary_Hws where SALESID = 'SO-1787116'`;

            request.query(ourQuery, function (err, recordset) {
                
                if (err) reject(err);
            	
            	resolve(recordset.recordsets[0]);      	                     
           
                sql.close();
            
             });
        
        });
	});
}

var SFFunc=function(){
	return new Promise(function(resolve, reject) {
    
        sfConnection.getToken(function(err, res) {

            if (res.accToken) {

                var query = `select name, Amount, ERP_Sales_Order_Number__c, ERP_Final_Amount__c, AccountID, CloseDate, 
                				Opportunity_State_Province__c from Opportunity where ERP_Sales_Order_Number__c = 'SO-1787116' `

                sfConnection.conn.query(query, function (err, result) {

                    if (err) { 
                        
                        console.log(err);
                        reject(err); 
                    }

                    resolve(result.records[0]);

                });

            } else {

                console.log(err);
            }

        });
	})
}

module.exports={
	SFFunc,
	AX2009Func
}
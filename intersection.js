const config9=require('./AX2009/config2009.js');
const sfConnection = require('./Salesforce/access');
const sql=require('mssql');


function intersection(account){
	//have to make queries to 2009 and SF sequentially, make an object combining the two and return it

	//connection to AX2009
	
	var AX2009Func=function(){
		return new Promise((resolve,reject)=>{
    
			console.log('hi');
			var config1=config9.config;
	   
	        sql.connect(config1, function (err) {    
	        
	            if (err) console.log(err);
	            
	            var request = new sql.Request();           
	             
	            ourQuery = `select SALESID, SalesName, createdDate, Amount from SalesSummary_Hws where SALESID = 'SO-1787116'`;

	            request.query(ourQuery, function (err, recordset) {
	                
	                if (err) reject(err);
	            	
	            	 console.log(recordset.recordsets[0]);    

	            	resolve(recordset.recordsets[0]);      	                     
	           
	                sql.close();
	            
	             });
	        
	        });
		});
	}
	
	var SFFunc=function(){
		return new Promise((resolve, reject) => {
        
            sfConnection.getToken((err, res) => {

                if (res.accToken) {

                    var query = `select name, Amount, ERP_Sales_Order_Number__c, ERP_Final_Amount__c, AccountID, CloseDate, 
                    				Opportunity_State_Province__c from Opportunity where ERP_Sales_Order_Number__c = 'SO-1787116' `

                    sfConnection.conn.query(query, function (err, result) {

                        if (err) { 
                            
                            console.log(err);
                            reject(err); 
                        }

                        console.log('result_______',result.records[0]);

                        resolve(result.records[0]);

                    });

                } else {

                    console.log(err);
                }

            });
		})
	}

    return Promise.all([AX2009Func(),SFFunc()]).then(function(values){
    	return({
    				AX2009:values[0][0],
    				SalesForce:{
    					Name:values[1].Name,
    					Amount:values[1].Amount,
    					ERP_Sales_Order_Number__c:values[1].ERP_Sales_Order_Number__c,
    					ERP_Final_Amount__c:values[1].ERP_Final_Amount__c,
    					AccountID:values[1].AccountID,
    					CloseDate:values[1].CloseDate,
    					Opportunity_State_Province__c:values[1].Opportunity_State_Province__c
    				}
    			});
    });	
}

module.exports={
	intersection
}
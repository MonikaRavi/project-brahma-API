const sql = require('mssql');
const sfConnection = require('../../configuration/accessSF');



//performs sql query by taking in 'OurQuery' and configuration value of 'config' with escaped value 'value' to prevent SQL injection
var sqlQuery = function(ourQuery,config,value){

	//make a connection to db using given Configuration=config  and query=ourQuery
	return new Promise(function(resolve,reject){   
    
	  	sql.connect(config, function (err) {    

	        if (err){

	        	reject(err);

	        }else{

	        	var request = new sql.Request();      

		        request.input('value',sql.VarChar(15),value); 

	        	request.query(ourQuery, function (err, recordset) {
	            
	                if (err) {

	                	reject(err);

	                }else{

	                	resolve(recordset); 
		         	}
		         	sql.close();
        		
        		});
	        }	        
	        	
	    })

	})
}


//performs query to salesforce database
var SFQuery = function(ourQuery){

	//make a connection to db using given uery=ourQuery

	return new Promise(function(resolve, reject) {
    
        sfConnection.getToken().then(function(res) {

                sfConnection.conn.query(ourQuery, function (err, result) {

                    if (err) { 
                        
                        console.log(err);
                        reject(err); 
                    }

                    resolve(result);

                });

            },function(error){

                reject(error);
            });
	})
}

module.exports = {
	sqlQuery,
	SFQuery
}
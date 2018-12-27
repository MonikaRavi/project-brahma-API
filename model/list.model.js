const sql=require('mssql');


function list(req,res){
	return new Promise((resolve,reject)=>{
    
			console.log('hi');
			// var config1=config9.config;
	   		var config1={
				user: 'nodeapp',
		        password: 'traynor_1906',
		        server: 'HWSSQL3', 
		        database: 'HawsBusinessAnalysis'
		    };
	        sql.connect(config1, function (err) {    
	        
	            if (err) console.log(err);

	            
	            var request = new sql.Request();           
	             
	            ourQuery = `select distinct A.SALESID, SALESNAME, CREATEDDATETIME, Customer, 

								ITEMID ,ITEMNAME, SALESQTY , LINEAMOUNT, SalesStatus

								from SalesDetail_hws A join temp_SOSF B on A.SALESID = B.SALESID`;

	            request.query(ourQuery, function (err, recordset) {
	                
	                if (err) reject(err);
	            	
	            	 console.log(recordset.recordsets[0]);    

	            	resolve(recordset.recordsets[0]);      	                     
	           
	                sql.close();
	            
	             });
	        
	        });
		})
}

module.exports={
	list
}
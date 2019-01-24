const AX365Model = require('../model/AX365.model');


//return the top 5 sales orders for a particular customer account
function salesOrderByCustomer(req,res){

	return AX365Model.getSalesOrderByCustomer(req.params.account);

}


//find the opportunity for a particular customer in AX365
function salesOrderListForCustomer(req,res){

	AX365Model.getSalesOrderByCustomer(req.params.account).then(function(recordset){
		
		if(recordset.recordsets[0].length !== 0){

			var customer = {
		                CustAccount:recordset.recordsets[0][1].CustAccount,
		                Customer:recordset.recordsets[0][1].Customer
		         	};

			    //get the first five sales records of the customer     		
	      	var tempData = [];

	        recordset.recordsets[0].forEach(function(customer){

	            var tempCus = {
	                
	                SalesId : customer.SalesID,
	                createdDate : customer.createdDate,
	                Amount : customer.Amount
	            
	            }

	            tempData.push(tempCus);
	        
	        });

        	res.send(tempData);
		
		}else{
		 
		 	res.status(404).send({
		
				status: 404,
				errorMessage:'No records could be found for this salesId, please retry with another Customer id.'
		
			})
		
		}	

	},function(error){
		
		res.status(400).send(error);
	
	});
					
}

function salesOrderList(req,res){
	AX365Model.getSalesOrderList().then(function(recordset){

		// console.log('recordsset:',recordset.recordsets[0]);

		res.send(recordset.recordsets[0]);
	
	},function(error){
	
		res.status(404).send({
		
				status : 404,
				errorMessage :'No results were found for this query!'
		
			});
	
	})

}

function customerDetailsFromSalesId(req,res){
	console.log('salesId:',req.params.salesId);
	AX365Model.getCustomerDetailsFromSalesId(req.params.salesId).then(function(result){
		
		res.send(result.recordsets[0][0]);
	
	},function(error){

		res.status(404).send({
		
				status : 404,
				errorMessage :'No results were found for this query!'
		
			});

	})
}

function salesOrderDetailsFromSalesId(req,res){

	AX365Model.getSalesOrderDetailsFromSalesId(req.params.salesId).then(function(result){

		res.send(result.recordsets[0][0]);

	},function(error){

		res.status(404).send({
		
				status : 404,
				errorMessage :'No results were found for this query!'
		
			});
	})
}


module.exports = {
 
 	salesOrderByCustomer,
	salesOrderList,
	salesOrderListForCustomer,
	customerDetailsFromSalesId,
	salesOrderDetailsFromSalesId

}
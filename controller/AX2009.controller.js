const AX2009Model = require('../model/AX2009.model');

//get sales order list for 2009
function AX2009SalesOrderList(req,res){
	
	AX2009Model.getSalesOrderList().then(function(result){
	
		if(result !== null){
			
			res.send(result.recordsets[0]);
		
		}else{
		
			res.status(404).send({
		
				status : 404,
				errorMessage :'No results were found for this query!'
		
			});
		
		}		
	
	},function(error){
	
		res.send(error);
	
	})
}

//find the customer sales list for AX2009 for a particular customer (previously opportunity)
function customerSalesList(req,res){

	AX2009Model.getSalesFromCustomer(req,res).then(function(recordset){
		
		if(recordset.recordsets[0].length !== 0){
			
			var data = recordset.recordsets[0][1];

			var customer = {
			        
			        CustAccount : data.CustAccount,
			        Customer : data.Customer
			    
			    };
		    //get the top 5 sales order of the customer
		        var tempData = [];
		        
		        recordset.recordsets[0].forEach(function(customer){
		        
		            var tempCus = {
		                
		                SalesId : customer.SalesID,
		                createdDate : customer.createdDate,
		                Amount : customer.Amount
		            
		            }
		            
		            tempData.push(tempCus);
		        
		        });
		    //return the data
				res.send ({
			      	
			      	customer : customer,
			        data : tempData
			    
			    });
			
			}else{
			 
			 	res.status(404).send({
					
					status : 404,
					errorMessage : 'No records could be found for this salesId, please retry with another customer Account.'
			
				});
			}
		
			},function(err){
				
				res.status(400).send(err);
	
	});

}


//returns the customer details from a sales ID
function AX2009CustomerDetailsFromSalesId(req,res){

	AX2009Model.getCustomerDetailsFromSalesId(req,res).then(function(result){
	
		console.log(result);

		if(result.recordsets[0].length !== 0){

			var data=result.recordsets[0][0];
			
			res.send([{
			
				so : data.SALESID,
				account : data.CustAccount,
				name : data.Customer,
				phone : data.PHONE,
				email : data.EMAIL,
				address : data.ADDRESS,
				RSD : data.RSD
			
			}])

		}else{
			
			res.status(404).send({
			
				status : 404,
				errorMessage : ' No records could be found for this salesId, please retry with another SalesId.'
			
			})
		
		}
		
	},function(error){
		res.send(error);
	})
}


//returns the sales order details of a particular Sales Id in Ax2009
function AX2009salesOrderDetailsFromSalesID(req,res){

	AX2009Model.getSalesOrderDetailsFromSalesId(req.params.salesId).then(function(result){
	
		if(result.recordsets[0].length !== 0){
			
			res.send(result.recordsets[0]);
		
		}else{
		
			res.status(404).send({
		
				status : 404,
				errorMessage : 'No records could be found for this salesId, please retry with another SalesId.'
		
			})

		}
		
	},function(error){
		
		res.send(error);
	
	})

}

//returns the list of sales order for a particular customer //used in aggregate
function salesFromCustomer(req,res){
	
	return AX2009Model.getSalesFromCustomer(req,res);

}


module.exports = {

	salesFromCustomer,
	AX2009CustomerDetailsFromSalesId,
	AX2009SalesOrderList,
	AX2009salesOrderDetailsFromSalesID,
	customerSalesList

}
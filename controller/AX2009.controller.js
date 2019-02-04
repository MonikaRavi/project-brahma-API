const AX2009Model = require('../model/AX2009.model');

//get sales order list for 2009
function salesOrderList(req,res){
	
	AX2009Model.getSalesOrderList().then(function(result){
	
		if(typeof result.recordsets[0][0] !=="undefined"){
			
			res.send(result.recordsets[0]);
		
		}else{
			
			res.status(200).send([]);
		
		}		
	
	},function(error){

		res.status(400).send({
		
				status : 400,
				errorMessage :'Bad Request!'
		
			});
	
	})
}

//find the customer sales list for AX2009 for a particular customer (previously opportunity)
function customerSalesList(req,res){

	AX2009Model.getSalesFromCustomer(req,res).then(function(result){
		
		if(typeof result.recordsets[0][0] != "undefined"){

			var data = result.recordsets[0][1];

			var customer = {
			        
		        CustAccount : data.CustAccount,
		        Customer : data.Customer
			    
			};
		    //get the top 5 sales order of the customer
	        var tempData = [];
	        
	        result.recordsets[0].forEach(function(customer){
	        
	            var tempCus = {
	                
	                SalesId : customer.SalesID,
	                createdDate : customer.createdDate,
	                Amount : customer.Amount
	            
	            }
	            
	            tempData.push(tempCus);
	        
	        });
		    //return the data
			res.status(200).send ([{
		      	
		      	customer : customer,
		        data : tempData
		    
		    }]);
			
		}else{

		 	res.status(200).send([]);
		}
		
	},function(err){

		res.status(404).send(err);

	});

}


//returns the customer details from a sales ID
function customerDetailsFromSalesId(req,res){

	AX2009Model.getCustomerDetailsFromSalesId(req,res).then(function(result){

		if(typeof result.recordsets[0][0] != "undefined"){
			console.log('result:',result.recordsets[0][0]);
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
			console.log('hi');
			res.status(200).send([]);
		
		}
		
	},function(error){
		res.status(400).send(error);
	})
}


//returns the sales order details of a particular Sales Id in Ax2009
function salesOrderDetailsFromSalesID(req,res){

	AX2009Model.getSalesOrderDetailsFromSalesId(req.params.salesId).then(function(result){
	
		if(typeof result.recordsets[0][0] != "undefined"){
			
			res.send(result.recordsets[0]);
		
		}else{
		
			res.status(200).send([]);

		}
		
	},function(error){
		
		res.status(400).send(error);
	
	})

}

//returns the list of sales order for a particular customer //used in aggregate
function salesFromCustomer(req,res){
	
	return AX2009Model.getSalesFromCustomer(req,res);

}

function onHand(req,res){
	AX2009Model.getOnHand(req.params.itemId).then(function(result){
		res.send(result.recordsets[0]);
	},(error)=>{
		res.status(400).send(error);
	});
}


module.exports = {

	salesFromCustomer,
	customerDetailsFromSalesId,
	salesOrderList,
	salesOrderDetailsFromSalesID,
	customerSalesList,
	onHand

}
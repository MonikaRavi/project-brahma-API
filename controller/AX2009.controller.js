const AX2009Model=require('../model/AX2009.model');

//returns the list of sales order for a particular customer
function salesFromCustomer(req,res){
	return AX2009Model.getSalesFromCustomer(req,res);
}

function opportunity(req,res){

	AX2009Model.getSalesFromCustomer(req,res).then(function(recordset){
	
		var customer={
			        CustAccount:recordset.recordsets[0][1].CustAccount,
			        Customer:recordset.recordsets[0][1].Customer
			    };
		    //get the top 5 sales order of the customer
		        var tempData=[];
		        recordset.recordsets[0].forEach(function(customer){
		            var tempCus={
		                SalesId:customer.SalesID,
		                createdDate:customer.createdDate,
		                Amount:customer.Amount
		            }
		            tempData.push(tempCus);
		        });
		    //return the data
				res.send ({
			      	customer: customer,
			        data: tempData
			    });
			},function(err){
				res.status(400).send(error);
	});
}


//returns the customer details from a sales ID
function AX2009CustomerDetailsFromSales(req,res){
	AX2009Model.getCustomerDetailsFromSales(req,res).then(function(result){
		res.send(result.recordsets[0]);
	},function(error){
		res.send(error);
	})
}

//returns sales Order list from Salesforce that made it to AX2009
function AX2009SalesOrderList(req,res){
	AX2009Model.getSalesOrderList(req,res).then(function(result){
		res.send(result.recordsets[0]);
	},function(error){
		res.send(error);
	})
}

function AX2009salesOrderDetailsFromSalesID(req,res){
	AX2009Model.getSalesOrderDetailsFromSalesId(req.params.salesId).then(function(result){
		res.send(result.recordsets[0]);
	},function(error){
		res.send(error);
	})
}

function AX2009SalesOrderListNew(req,res){
	AX2009Model.getSalesOrderListNew().then(function(result){
		res.send(result.recordsets[0]);
	},function(error){
		res.send(error);
	})
}

module.exports={
	salesFromCustomer,
	AX2009CustomerDetailsFromSales,
	AX2009SalesOrderList,
	AX2009SalesOrderListNew,
	AX2009salesOrderDetailsFromSalesID,
	opportunity
}
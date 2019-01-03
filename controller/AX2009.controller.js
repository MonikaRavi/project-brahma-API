const AX2009Model=require('../model/AX2009.model');

//returns the list of sales order for a particular customer
function salesFromCustomer(req,res){
	return AX2009Model.getSalesFromCustomer(req,res);
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

module.exports={
	salesFromCustomer,
	AX2009CustomerDetailsFromSales,
	AX2009SalesOrderList
}
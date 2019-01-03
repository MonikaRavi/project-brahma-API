const AX2009Model=require('../model/AX2009.model');

function salesFromCustomer(req,res){
	return AX2009Model.getSalesFromCustomer(req,res);
}

function AX2009CustomerDetailsFromSales(req,res){
	AX2009Model.getCustomerDetailsFromSales(req,res).then(function(result){
		res.send(result.recordsets[0]);
	},function(error){
		res.send(error);
	})
}

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
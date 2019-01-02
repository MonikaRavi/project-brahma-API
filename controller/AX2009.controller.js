const AX2009Model=require('../model/AX2009.model');

function AX2009Controller(req,res){
	return AX2009Model.accountAX2009Func(req,res);
}

function AX2009CustomerDetails(req,res){
	AX2009Model.customerFunc(req,res).then(function(result){
		res.send(result.recordsets[0]);
	},function(error){
		res.send(error);
	})
}

function AX2009List(req,res){
	AX2009Model.listFunc(req,res).then(function(result){
		res.send(result.recordsets[0]);
	},function(error){
		res.send(error);
	})
}

module.exports={
	AX2009Controller,
	AX2009CustomerDetails,
	AX2009List
}
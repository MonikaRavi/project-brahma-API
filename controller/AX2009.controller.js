const AX2009Model=require('../model/AX2009.model');

function AX2009Controller(req,res){
	return AX2009Model.accountAX2009Func(req,res);
}

function AX2009CustomerController(req,res){
	AX2009Model.customerFunc(req,res).then((result)=>{
		res.send(result);
	})
}

function AX2009List(req,res){
	AX2009Model.listFunc(req,res).then((result)=>{
		res.send(result);
	})
}

module.exports={
	AX2009Controller,
	AX2009CustomerController,
	AX2009List
}
var sfQuery = require('../model/salesforce.model');
var ax365Controller=require('../controller/AX365.controller');
var ax2009Controller=require('../controller/AX2009.controller');


var aggregateData= async function(req,res){
	
	var account=req.params.account;

	async function sf(){
		let salesPromise=sfQuery.querySoql(account);
		let sfResult=await salesPromise;
		return sfResult;
	}

	async function AX65(){
		let ax65Promise=ax365Controller.AX365Controller(req,res);
		let ax65Result=await ax65Promise;
		return ax65Result;
	}

	async function AX9(){
		let ax9Promise=ax2009Controller.AX2009Controller(req,res);
		let ax9Result=await ax9Promise;
		return ax9Result; 
	}

	var SfData=await sf();
	var AXData65=await AX65();
	var AXData9=await AX9();

	var JSON={
		salesforce:SfData,
		AX655:AXData65,
		AX2009:AXData9
	}
	
	res.send(JSON);
}

module.exports={
	aggregateData
}
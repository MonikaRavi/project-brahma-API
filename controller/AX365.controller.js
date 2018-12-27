const AX365Model=require('../model/AX365.model');

function AX365Controller(req,res){
	return AX365Model.accountAX365Func(req.params.account);
}

module.exports={
	AX365Controller
}
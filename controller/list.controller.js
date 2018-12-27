const listModel=require('../model/list.model');


function listFunc(req,res){	

	listModel.list(req,res).then((result)=>{
			res.send(result);
	});
}


module.exports={
	listFunc
}


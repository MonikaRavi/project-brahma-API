const AX365Model=require('../model/AX365.model');

function salesOrderByCustomer(req,res){
	return AX365Model.getSalesOrderByCustomer(req.params.account);
}

function customerDetails(req,res){
	var data=AX365Model.getCustomerDetailsBySalesId(req.params.salesId).then(function(result){
		//console.log('result:',result);
		var data=result.recordset[0];
		//console.log('data',data);
		res.send({
			Name:data.ORGANIZATIONNAME,
			Account:data.CUSTOMERACCOUNT,			
			Address:data.FULLPRIMARYADDRESS,
			Phone:data.PRIMARYCONTACTPHONE,
			Email:data.PRIMARYCONTACTEMAIL,
			SalesId:data.SALESORDERNUMBER

	})
	},function(error){
		console.log(error);
	})
	
}

module.exports={
	salesOrderByCustomer,
	customerDetails
}
const AX365Model=require('../model/AX365.model');


//return the top 5 sales orders for a particular customer account
function salesOrderByCustomer(req,res){
	return AX365Model.getSalesOrderByCustomer(req.params.account);
}


//find the opportunity for a particular customer in AX365
function opportunity(req,res){

	AX365Model.getSalesOrderByCustomer(req.params.account).then(function(recordset){
		var customer={
		                CustAccount:recordset.recordsets[0][1].CustAccount,
		                Customer:recordset.recordsets[0][1].Customer
		         	};

			    //get the first five sales records of the customer     		
      	var tempData=[];
        recordset.recordsets[0].forEach(function(customer){
            var tempCus={
                SalesId:customer.SalesID,
                createdDate:customer.createdDate,
                Amount:customer.Amount
            }
            tempData.push(tempCus);
        });

        res.send(tempData);

	},function(error){
		res.status(400).send(err);
	});
					
}

module.exports={
	salesOrderByCustomer,
	// customerDetails,
	opportunity
}
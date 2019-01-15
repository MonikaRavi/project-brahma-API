const AX365Model=require('../model/AX365.model');


//return the sales orders for a particular customer account
function salesOrderByCustomer(req,res){
	return AX365Model.getSalesOrderByCustomer(req.params.account);
}

//retruns the customer details for a particular sales Id
// function customerDetails(req,res){
// 	var data=AX365Model.getCustomerDetailsBySalesId(req.params.salesId).then(function(result){
// 		//console.log('result:',result);
// 		var data=result.recordset[0];
// 		//console.log('data',data);
// 		res.send([{
// 			Name:data.ORGANIZATIONNAME,
// 			Account:data.CUSTOMERACCOUNT,			
// 			Address:data.FULLPRIMARYADDRESS,
// 			Phone:data.PRIMARYCONTACTPHONE,
// 			Email:data.PRIMARYCONTACTEMAIL,
// 			SalesId:data.SALESORDERNUMBER

// 	}])
// 	},function(error){
// 		console.log(error);
// 	})
	
// }

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
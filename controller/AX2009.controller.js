const AX2009Model = require('../model/AX2009.model');

//get sales order list for 2009
function salesOrderList(req,res){
	
	AX2009Model.getSalesOrderList().then(function(result){
	
		if(typeof result.recordsets[0][0] !=="undefined"){
			
			res.send(result.recordsets[0]);
		
		}else{
			
			res.status(200).send([]);
		
		}		
	
	},function(error){

		res.status(400).send({
		
				status : 400,
				errorMessage :'Bad Request!'
		
			});
	
	})
}

//find the customer sales list for AX2009 for a particular customer (previously opportunity)
function customerSalesList(req,res){

	AX2009Model.getSalesFromCustomer(req,res).then(function(result){
		
		if(typeof result.recordsets[0][0] != "undefined"){

			var data = result.recordsets[0][1];

			var customer = {
			        
		        CustAccount : data.CustAccount,
		        Customer : data.Customer
			    
			};
		    //get the top 5 sales order of the customer
	        var tempData = [];
	        
	        result.recordsets[0].forEach(function(customer){
	        
	            var tempCus = {
	                
	                SalesId : customer.SalesID,
	                createdDate : customer.createdDate,
	                Amount : customer.Amount
	            
	            }
	            
	            tempData.push(tempCus);
	        
	        });
		    //return the data
			res.status(200).send ([{
		      	
		      	customer : customer,
		        data : tempData
		    
		    }]);
			
		}else{

		 	res.status(200).send([]);
		}
		
	},function(err){

		res.status(404).send(err);

	});

}


//returns the customer details from a sales ID
function customerDetailsFromSalesId(req,res){

	AX2009Model.getCustomerDetailsFromSalesId(req,res).then(function(result){

		if(typeof result.recordsets[0][0] != "undefined"){
			console.log('result:',result.recordsets[0][0]);
			var data=result.recordsets[0][0];
			
			res.send([{
			
				so : data.SALESID,
				account : data.CustAccount,
				name : data.Customer,
				phone : data.PHONE,
				email : data.EMAIL,
				address : data.ADDRESS,
				RSD : data.RSD
			
			}])

		}else{
			console.log('hi');
			res.status(200).send([]);
		
		}
		
	},function(error){
		res.status(400).send(error);
	})
}


//returns the sales order details of a particular Sales Id in Ax2009
function salesOrderDetailsFromSalesID(req,res){

	AX2009Model.getSalesOrderDetailsFromSalesId(req.params.salesId).then(function(result){
	
		if(typeof result.recordsets[0][0] != "undefined"){
			
			res.send(result.recordsets[0]);
		
		}else{
		
			res.status(200).send([]);

		}
		
	},function(error){
		
		res.status(400).send(error);
	
	})

}

//returns the list of sales order for a particular customer //used in aggregate
function salesFromCustomer(req,res){
	
	return AX2009Model.getSalesFromCustomer(req,res);

}

function onHand(req,res){
	AX2009Model.getOnHand(req.params.itemId).then(function(result){
		res.send(result.recordsets[0]);
	},(error)=>{
		res.status(400).send(error);
	});
}

function invoiceDetail(req,res){
	AX2009Model.getInvoiceDetail(req.params.salesId).then(function(result){
		 var resultArray=result.recordsets[0];

		if(typeof resultArray != "undefined"){
			
			//reorder the invoice details

			var newResult=[];

			//first arrange the object in proper shape (seperate invoice ID and invoice details)
			resultArray.forEach(function(resultItem,index){
				
				var singleObject={};

				singleObject.INVOICEID=resultItem.INVOICEID;
				singleObject.INVOICEDATE=resultItem.INVOICEDATE;
				singleObject.INVOICEDETAILS=[{
					ITEMID:resultItem.ITEMID,
					ITEMNAME:resultItem.ITEMNAME,
					SALESQTY:resultItem.SALESQTY,
					LINEAMOUNT:resultItem.LINEAMOUNT,
					UNITPRICE:resultItem.UNITPRICE,
					DISCOUNT:resultItem.DISCOUNT
				}]

				newResult.push(singleObject);
			})


			var newnewResult=[];
			newnewResult.push(newResult[0]);
			var count=0;
			for(i=0;i<newResult.length;i++){

				for(j=i+1;j<newResult.length;j++){
					if(newResult[i].INVOICEID==newResult[j].INVOICEID){
						newnewResult[count].INVOICEDETAILS.push(newResult[j].INVOICEDETAILS[0]);
						continue;
					}else{
						i=j-1;
						count++;
						newnewResult.push(newResult[j]);
						break;
					}
				}
				
			}
		res.send(newnewResult);


		//add commission data to the invoice data


		
		}else{
		
			res.status(200).send([]);

		}
		
	},function(error){
		
		res.status(400).send(error);
	
	})
}

function salesHeaders(req,res){
	AX2009Model.getSalesHeaders(req.params.salesId).then(function(result){

		if(typeof result.recordsets[0][0] != "undefined"){
			
			res.send(result.recordsets[0]);
		
		}else{
		
			res.status(200).send([]);

		}
		
	},function(error){
		
		res.status(400).send(error);
	})
}

function commissionDetails(req,res){
	AX2009Model.getCommissionDetails(req.params.salesId).then(function(result){
		
		var resultArray=result.recordsets[0];

		if(typeof result.recordsets[0][0] != "undefined"){
			
			var newResult=[];
			// console.log(resultArray);

			//first arrange the object in proper shape (seperate invoice ID and invoice details)
			resultArray.forEach(function(resultItem,index){
				var singleObject={};

				singleObject.INVOICEID=resultItem.INVOICEID;
				singleObject.INVOICEDATE=resultItem.INVOICEDATE;
				singleObject.INVOICEDETAILS=[{
					AMOUNT:resultItem.Amount,
					REPID:resultItem.REPID,
					REP:resultItem.REP,
					CURRENCYCODE:resultItem.CURRENCYCODE,
					COMMISSIONDATE:resultItem.CommissionDate
				}]

				newResult.push(singleObject);
			})

			// console.log('newResult:',newResult);
			var newnewResult=[];
			newnewResult.push(newResult[0]);
			var count=0;
			for(i=0;i<newResult.length;i++){

				for(j=i+1;j<newResult.length;j++){

					if(newResult[i].INVOICEID==newResult[j].INVOICEID){
						// console.log('true');
						newnewResult[count].INVOICEDETAILS.push(newResult[j].INVOICEDETAILS[0]);
						continue;
					}else{
						// console.log('false');
						i=j-1;
						count++;
						newnewResult.push(newResult[j]);
						break;
					}
				}
				
			}
		res.send(newnewResult);
		
		}else{
		
			res.status(200).send([]);

		}
		
	},function(error){
		
		res.status(400).send(error);
	})
}

function commissionAndInvoiceDetails(req,res){

	AX2009Model.getCommissionAndInvoiceDetails(req.params.salesId).then(function(result){
		
		if(typeof result!=="undefined"){

				var invoiceDataArray=result.invoiceData;

				if(typeof invoiceDataArray != "undefined"){
							
					var shapedInvoiceArrayV1=[];

					//first arrange the object in proper shape (seperate invoice ID and invoice details)
					invoiceDataArray.forEach(function(resultItem,index){
						
						var singleObject={};

						singleObject.INVOICEID=resultItem.INVOICEID;
						singleObject.INVOICEDATE=resultItem.INVOICEDATE;
						singleObject.INVOICEDETAILS=[{
							ITEMID:resultItem.ITEMID,
							ITEMNAME:resultItem.ITEMNAME,
							SALESQTY:resultItem.SALESQTY,
							LINEAMOUNT:resultItem.LINEAMOUNT,
							UNITPRICE:resultItem.UNITPRICE,
							DISCOUNT:resultItem.DISCOUNT
						}]

						shapedInvoiceArrayV1.push(singleObject);

					})

					//putting line items in corresponding INVOICE ID

					var shapedInvoiceArrayV2=[];
					shapedInvoiceArrayV2.push(shapedInvoiceArrayV1[0]);
					var count=0;
					for(i=0;i<shapedInvoiceArrayV1.length;i++){

						for(j=i+1;j<shapedInvoiceArrayV1.length;j++){
							if(shapedInvoiceArrayV1[i].INVOICEID==shapedInvoiceArrayV1[j].INVOICEID){
								shapedInvoiceArrayV2[count].INVOICEDETAILS.push(shapedInvoiceArrayV1[j].INVOICEDETAILS[0]);
								continue;
							}else{
								i=j-1;
								count++;
								shapedInvoiceArrayV2.push(shapedInvoiceArrayV1[j]);
								break;
							}
						}
						
					}
			
			//assign commission to corresponding invoices
				var commission=result.commissionData;
				var finalInvoiceDetails=shapedInvoiceArrayV2;
				for(var Iindex=0;Iindex<shapedInvoiceArrayV2.length;Iindex++){
					for(var cIndex=0;cIndex<commission.length;cIndex++){
						
						if(shapedInvoiceArrayV2[Iindex].INVOICEID==commission[cIndex].INVOICEID){
							var com={
								REPID:commission[cIndex].REPID,
								REP:commission[cIndex].REP,
								Amount:commission[cIndex].Amount,
								CURRENCYCODE:commission[cIndex].CURRENCYCODE,
								COMMISSIONDATE:commission[cIndex].COMMISSIONDATE
							}
							finalInvoiceDetails[Iindex].commission=com;


						}
						
					}

				}
				res.send(finalInvoiceDetails);
			
			}else{
			
				res.status(200).send([]);

			}
		}

	},function(error){
		
		res.status(400).send(error);
	})
}

function inventoryList(req,res){
	AX2009Model.getInventoryList().then(function(result){
		res.send(result.recordsets[0]);
	},(error)=>{
		res.status(200).send(error);
	})
}

function cloudImageFlag(req,res){


	AX2009Model.getCloudImage(req.params.itemID).then(function(result){

		res.status(200).send(result.recordset);
		
	}, function(error){

		console.log(error);

		res.status(400).send(error);
	})

}


module.exports = {

	salesFromCustomer,
	customerDetailsFromSalesId,
	salesOrderList,
	salesOrderDetailsFromSalesID,
	customerSalesList,
	onHand,
	invoiceDetail,
	salesHeaders,
	commissionDetails,
	commissionAndInvoiceDetails,
	inventoryList,
	cloudImageFlag
}
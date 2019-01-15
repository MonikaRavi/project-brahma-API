var salesforceModel = require('../model/salesforce.model');
var ax365Controller=require('../controller/AX365.controller');
var ax2009Controller=require('../controller/AX2009.controller');

//return the informatoin of a sales order existing in AX2009, AX365 and Salesforce
var aggregateData= async function(req,res){
	
	var account=req.params.account;

	//get required data for Account from Salesforce
		async function sf(){
			let salesPromise=salesforceModel.getOpportunity(account);
			let sfResult=await salesPromise;
			return sfResult;
		}

	//get required data for Account from AX365
		async function AX65(){
			let ax65Promise=ax365Controller.salesOrderByCustomer(req,res);
			let recordset=await ax65Promise;

			//format the data as required
				//get the Name and account of the customer
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

			    //return the data
					return ({
				            	customer: customer,
				          	    data: tempData
				            });;
		}

	//get required data from AX2009
		async function AX9(){

			let ax9Promise=ax2009Controller.salesFromCustomer(req,res);
			try{
				let recordset=await ax9Promise;
				//format the data as required
				 	//get the Customer Name and account
						var customer={
					        CustAccount:recordset.recordsets[0][1].CustAccount,
					        Customer:recordset.recordsets[0][1].Customer
					    };
				    //get the top 5 sales order of the customer
				        var tempData=[];
				        recordset.recordsets[0].forEach(function(customer){
				            var tempCus={
				                SalesId:customer.SalesID,
				                createdDate:customer.createdDate,
				                Amount:customer.Amount
				            }
				            tempData.push(tempCus);
				        });
				    //return the data
						return ({
					      	customer: customer,
					        data: tempData
					    });;
			}catch(error){
				return res.status(400).send(error);
			}
			
			
			
			
		}

	//wait for the 3 different data sources to provide the data
		var SfData=await sf();
		var AXData65=await AX65();
		var AXData9=await AX9();

	//make an object of the three different sources
		var JSON={
			salesforce:SfData,
			AX365:AXData65,
			AX2009:AXData9
		}
	
	res.send(JSON);
}

module.exports={
	aggregateData
}
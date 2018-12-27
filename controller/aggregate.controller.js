var sfQuery = require('../model/salesforce.model');
var ax365Controller=require('../controller/AX365.controller');
var ax2009Controller=require('../controller/AX2009.controller');


var aggregateData= async function(req,res){
	// console.log('account:',req.params.account);
	// var account=req.params.account;
	//declare the variable to store the returned data
	

		//for Salesforce
		// var SalesPromise= sfQuery.querySoql(decodeURI(req.params.account)).then(
	 //        (data) => {
	 //                    salesforceData= JSON.stringify(data, undefined, 1);
	 //                    //console.log('**************salesforceData:  ',salesforceData);
	 //                  },
	 //        (err) => {
	 //                   res.status(400).send(err);
	 //                 }
	 //      )

	 //      console.log("&&&&&&&&&&&&&&&&&&&&&&&");
		

		// //for AX365
		// var AX365Promise= ax365Query.accountAX365(decodeURI(req.params.account)).then(
		// 	(data)=>{
		// 				console.log("hey there*");
		// 				AX365Data=JSON.stringify(data,undefined,2);
		// 				//console.log('############AX365Data:', AX365Data);
		// 			},
		// 	(err)=> {
		// 				res.status(400).send(err);
		// 			}
		// 	)


		//For AX2009


		//____________________________________________trying async await ________________________________________________________________

		var account=req.params.account;

		async function sf(){
			let salesPromise=sfQuery.querySoql(account);
			let sfResult=await salesPromise;
			//console.log('SFResult:',sfResult);
			return sfResult;
		}

		async function AX65(){
			let ax65Promise=ax365Controller.AX365Controller(req,res);
			let ax65Result=await ax65Promise;
			//console.log('ax65Result:',ax65Result);
			return ax65Result;
		}

		async function AX9(){
			let ax9Promise=ax2009Controller.AX2009Controller(req,res);
			let ax9Result=await ax9Promise;
			//console.log('ax9Result:',ax9Result);
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
		//console.log('JSON',JSON);
		res.send(JSON);

		// sf().then((data)=>{
		// 	console.log(data);
		// },
		// (error)=>{
		// 	console.log(error);
		// });

		// AX65().then((data)=>{
		// 	console.log('Ax65:',data);
		// },
		// (error)=>{
		// 	console.log(error);
		// });

		// AX9().then((data)=>{
		// 	console.log('Ax9:',data);
		// },
		// (error)=>{
		// 	console.log(error);
		// });



		// let ax65Result=AX65();
		// let ax9Result=AX9();
		// console.log('sfResult:',sfResult);
		// console.log('ax65Result:',ax65Result);
		// console.log('ax9Result:',ax9Result);


		//____________________________________________trying Promise.all_______________________________________________________________
		
		// Promise.all([sfQuery.querySoql(decodeURI(req.params.account)),ax365Query.accountAX365(decodeURI(req.params.account))]).then(function(values){
		// 	console.log('values inside:',values);
		// 	console.log("Inside all: SF data:", salesforceData);
		// 	console.log("Inside all: AX Data:",AX365Data);
		// 	return values;

			// return  Promise.all([Promise.all([sfQuery.querySoql(decodeURI(req.params.account)),
			// 					 ax365Query.accountAX365(decodeURI(req.params.account))]),
			//  					 ax2009Query.accountAX2009(decodeURI(req.params.account))]);
			// return {
			// 	sf:salesforceData,
			// 	A365:AX365Data
			// }
		
		//return Promise.all([SalesPromise,AX365Promise]);		
}

module.exports={
	aggregateData
}
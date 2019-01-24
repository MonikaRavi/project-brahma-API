var request = require("request");
var configFreightView = require('./../configuration/freightview.config');


function getShipmentDataFromFreightView(salesOrder){
	console.log('salesOrder:',salesOrder);
	//setting up configuration for freightview
	var url = "https://www.freightview.com/api/v1.0/shipments/";
	// var pro = 123;
	// var bol = 456;
	// var pickupDate = "2018-10-30";
	var ref = salesOrder;
	var configFrieghtView = configFreightView.getFrieghtViewConfig(url,ref);


	return new Promise(function(resolve, reject){

		request(configFrieghtView, function (err, response, body) {
	  		
	  		if (err) reject(err);
	  		
	  		var body=JSON.parse(body);

	  		console.log('body:',body);
	  		
	  		if(body.shipments.length !== 0){
	  		
	  			resolve(body.shipments[0]);
	  		
	  		}else{
	  		
	  			reject({
	  		
	  				status:200,
	  				errorMessage:'No records found!'
	  		
	  			})
	  		
	  		}
	  			 
		})
	
	})
	
}

module.exports={
	getShipmentDataFromFreightView
}
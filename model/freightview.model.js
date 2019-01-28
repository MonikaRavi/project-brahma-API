var request = require("request");
var configFreightView = require('./../configuration/freightview.config');


function getShipmentDataFromSalesOrder(salesOrder){
	console.log('salesOrder:',salesOrder);
	//setting up configuration for freightview
	var url = "https://www.freightview.com/api/v1.0/shipments/";
	var ref = salesOrder;
	

	var configFreightViewDetails = configFreightView.getFreightViewConfig(url);
	configFreightViewDetails.qs.ref=salesOrder;

	return new Promise(function(resolve, reject){

		request(configFreightViewDetails, function (err, response, body) {
	  		
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


function getShipmentDataFromPickUpDate(pickUpDate){

	console.log('pickUpDate:',pickUpDate);
	//setting up configuration for freightview
	var url = "https://www.freightview.com/api/v1.0/shipments/";
	var pickupDate = pickUpDate;
	var configFreightViewDetails = configFreightView.getFreightViewConfig(url);
	configFreightViewDetails.qs.pickupDate = '2019-1-24';

	console.log('configFreightViewDetails:',configFreightViewDetails);

	return new Promise(function(resolve, reject){

		request(configFreightView, function (err, response, body) {
	  		
	  		if (err) reject(err);
	  		
	  		var body=JSON.parse(body);

	  		console.log('body:',body);
	  		
	  		if(body.shipments.length !== 0){
	  			console.log('body:',body);
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
	getShipmentDataFromSalesOrder,
	getShipmentDataFromPickUpDate
}
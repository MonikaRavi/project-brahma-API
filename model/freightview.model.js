var request = require("request");
var configFreightView = require('./../configuration/freightview.config');


function getShipmentDataFromSalesOrderWithSO(salesIdNumberOnly){
		
	var configFreightViewDetails = configFreightView.getFreightViewConfig();
	
	return new Promise(function(resolve, reject){
			
			//first send off a request with SO- in front
			// console.log('with');
			configFreightViewDetails.qs.ref='SO-'+salesIdNumberOnly;
			request(configFreightViewDetails, function (err, response, body) {
		  		
		  		if (err) reject(err);
		  		
		  		 var body=JSON.parse(body);		
		  		 // console.log("body with:",body.shipments[0].carrier);  		
		  		
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

function getShipmentDataFromSalesOrderWithoutSO(salesIdNumberOnly){

	var configFreightViewDetails = configFreightView.getFreightViewConfig();

	return new Promise(function(resolve, reject){
		
		//first send off a request without SO- in front

		configFreightViewDetails.qs.ref=salesIdNumberOnly;

		request(configFreightViewDetails, function (err, response, body) {
	  		
	  		if (err) reject(err);
	  		
	  		 var body=JSON.parse(body);	  		 
	  		
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

	//setting up configuration for freightview
	var url = "https://www.freightview.com/api/v1.0/shipments/";
	var pickupDate = pickUpDate;

	var options = {	 
		    method : "GET",
		    url : url,
		    qs : {
				pickupDate:pickupDate  	
		  	},
		  	
		  	auth : {
		    	"user" : "15aaf4dfbdb4edd7fd20bc5bc71d8f7bd458ddd945a"
		  	},

		  	headers : {
		    	"content-type" : "application/json"
			}
		}

	return new Promise(function(resolve, reject){

		request(options, function (err, response, body) {
	  		
	  		if (err) reject(err);
	  		
	  		var body=JSON.parse(body);

	  		// console.log('body:',body.shipments.length);
	  		
	  		if(body.shipments.length !== 0 && typeof(body)!=null){
	  			// console.log()
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
	getShipmentDataFromSalesOrderWithSO,
	getShipmentDataFromPickUpDate,
	getShipmentDataFromSalesOrderWithoutSO
}
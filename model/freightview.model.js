var request = require("request");
var configFreightView = require('./../configuration/freightview.config');


function getShipmentDataFromSalesOrder(salesOrder){
		
	var configFreightViewDetails = configFreightView.getFreightViewConfig();
	
	return new Promise(function(resolve, reject){
			
			//first send off a request with SO- in front
			configFreightViewDetails.qs.ref=salesOrder;

			request(configFreightViewDetails, function (err, response, body) {
		  		
		  		if (err){

			      reject(err);

			    }

			    else{
			      
			      var body=JSON.parse(body);

			      resolve(body);

			      // if(typeof body.shipments[0]=="undefined"){ //meaning no data is returned ie. body.shipments[0]={[]}
			      
			      //   resolve (body);

			      // }else{
			        
			      //   resolve(body.shipments[0]);

			      // }

			    } 
		  			 
			})
		
	})
}

// function getShipmentDataFromSalesOrderWithoutSO(salesIdNumberOnly){

// 	var configFreightViewDetails = configFreightView.getFreightViewConfig();

// 	return new Promise(function(resolve, reject){
		
// 		//first send off a request without SO- in front

// 		configFreightViewDetails.qs.ref=salesIdNumberOnly;

// 		request(configFreightViewDetails, function (err, response, body) {
	  		
// 	  		if (err) reject(err);
	  		
// 	  		 var body=JSON.parse(body);	  		 
	  		
// 	  		if(body.shipments.length !== 0){//must change
	  		
// 	  			resolve(body.shipments[0]);
	  		
// 	  		}else{
// 	  			resolve(body);	  		
// 	  		}
	  			 
// 		})
	
// 	})

// }	



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
	getShipmentDataFromSalesOrder,
	getShipmentDataFromPickUpDate,
	
}
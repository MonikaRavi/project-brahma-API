var request = require("request")

var freightviewModel = require('./../model/freightview.model');

function shipmentDataFromSalesOrder(req,res){

	freightviewModel.getShipmentDataFromSalesOrder(req.params.salesOrder).then(function(data){
	
	  	if(data !== null){
	  		console.log('data:',data);
	  		res.send({

	  			carrier : data.rate.carrier,
	  			total : data.rate.total,
		  	 	charges : data.rate.charges,
		  	 	referenceNumber : data.origin.referenceNumber,
		  	 	destination : data.destination.address + data.destination.city + data.destination.state,
		  	 	company : data.destination.company,
		  	 	status : data.status,
		  	 	pickupDate : data.pickupDate,
		  	 	tracking : data.tracking
	  		
	  		})
	  	
	  	}

	},function(error){
		
		res.status(404).send({
	  	
	  		status : 404,
	  		errorMessage : 'No shipping information was available for this sales Order. Please try with different one!'
	  	
	  	})
	
	})
	
}

function shipmentDataFromPickUpDate(req,res){

	freightviewModel.getShipmentDataFromPickUpDate(req.params.pickUpDate).then(function(data){
		
	  	if(data !== null){
	  		console.log('data:',data);
	  		res.send({

	  			carrier : data.rate.carrier,
	  			total : data.rate.total,
		  	 	charges : data.rate.charges,
		  	 	referenceNumber : data.origin.referenceNumber,
		  	 	destination : data.destination.address + data.destination.city + data.destination.state,
		  	 	company : data.destination.company,
		  	 	status : data.status,
		  	 	pickupDate : data.pickupDate,
		  	 	tracking : data.tracking
	  		
	  		})
	  	
	  	}

	},function(error){
		
		res.status(404).send({
	  	
	  		status : 404,
	  		errorMessage : 'No shipping information was available for this sales Order. Please try with different one!'
	  	
	  	})
	
	})
}


module.exports = {
	shipmentDataFromSalesOrder,
	shipmentDataFromPickUpDate
}
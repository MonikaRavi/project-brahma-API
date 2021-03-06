var request = require("request")

var freightviewModel = require('./../model/freightview.model');

function shipmentDataFromSalesOrder(req,res){

	//setting up configuration for freightview
	var salesOrder=req.params.salesOrder;

	freightviewModel.getShipmentDataFromSalesOrder(salesOrder).then((data)=>{

		var shipmentsObject=data.shipments[0];
		console.log('type of shipmentsObject:',typeof shipmentsObject);
		if(typeof shipmentsObject!="undefined"){  //means if data is not empty
			var tracking=[];

	  		//sort the tracking.history 

	  		if(typeof shipmentsObject.tracking.history!="undefined"){ //sometimes Sales Orders don't have tracking info (but have other info)
	  			
	  			var tracking=shipmentsObject.tracking.history.sort(function(a,b){
	  				return new Date(b.createdDate)-new Date(a.createdDate);
	  			})
	  		
	  		}

	  		res.send({

	  			carrier : shipmentsObject.rate.carrier,
	  			total : shipmentsObject.rate.total,
		  	 	charges : shipmentsObject.rate.charges,
		  	 	referenceNumber : shipmentsObject.origin.referenceNumber,
		  	 	destination : shipmentsObject.destination.address + shipmentsObject.destination.city + shipmentsObject.destination.state,
		  	 	company : shipmentsObject.destination.company,
		  	 	status : shipmentsObject.status,
		  	 	pickupDate : shipmentsObject.pickupDate,
		  	 	tracking : tracking
	  		
	  		})
	  	
	  	}else{
	  		var salesIdNumberOnly=salesOrder.split("-")[1];
	  		freightviewModel.getShipmentDataFromSalesOrder(salesIdNumberOnly).then((data)=>{
	  			var shipmentsObject=data.shipments[0];
	  			console.log('type of shipmentsObject:',shipmentsObject);
	
	  			if(typeof shipmentsObject!="undefined"){

		  			if(typeof shipmentsObject.tracking.history!="undefined" && typeof shipmentsObject.tracking!="undefined"){ //sometimes Sales Orders don't have tracking info (but have other info)
	  			
	  					var tracking=shipmentsObject.tracking.history.sort(function(a,b){
	  					return new Date(b.createdDate)-new Date(a.createdDate);
	  					})
	  		
	  			}
		  			res.send({

			  			carrier : shipmentsObject.rate.carrier,
			  			total : shipmentsObject.rate.total,
				  	 	charges : shipmentsObject.rate.charges,
				  	 	referenceNumber : shipmentsObject.origin.referenceNumber,
				  	 	destination : shipmentsObject.destination.address + shipmentsObject.destination.city + shipmentsObject.destination.state,
				  	 	company : shipmentsObject.destination.company,
				  	 	status : shipmentsObject.status,
				  	 	pickupDate : shipmentsObject.pickupDate,
				  	 	tracking : tracking
		  		
		  			})
		  		}else{

		  			res.status(200).send([]);
		  		}

		  	},(error)=>{
		  		res.status(404).send({
	  	
			  		status : 404,
			  		errorMessage : "Bad request" 	
			  	});
		  	});
	  	}
	},function(error){

		res.status(404).send({
	  	
	  		status : 404,
	  		errorMessage : "Bad request" 	
	  	})
	
	});
	
}

function shipmentDataFromPickUpDate(req,res){

	freightviewModel.getShipmentDataFromPickUpDate(req.params.pickUpDate).then(function(data){
		
	  	if(data !== null && data !==undefined){

	  		var tracking=data.tracking.history.sort(function(a,b){
				return new Date(b.createdDate)-new Date(a.createdDate);
			})

	  		res.send({

	  			carrier : data.rate.carrier,
	  			total : data.rate.total,
		  	 	charges : data.rate.charges,
		  	 	referenceNumber : data.origin.referenceNumber,
		  	 	destination : data.destination.address + data.destination.city + data.destination.state,
		  	 	company : data.destination.company,
		  	 	status : data.status,
		  	 	pickupDate : data.pickupDate,
		  	 	tracking : tracking
	  		
	  		})
	  	
	  	}

	},function(error){
		
		res.status(404).send({
	  	
	  		status : 404,
	  		errorMessage : 'Bad request'
	  	
	  	})
	
	})
}


module.exports = {
	shipmentDataFromSalesOrder,
	shipmentDataFromPickUpDate
}
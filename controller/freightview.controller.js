var request = require("request")

var freightviewModel = require('./../model/freightview.model');

function shipmentDataFromSalesOrder(req,res){

	//setting up configuration for freightview
	var salesOrder=req.params.salesOrder;
	var salesIdNumberOnly;
	if(salesOrder===8)
		salesIdNumberOnly=salesOrder;
	else{
		salesIdNumberOnly=salesOrder.split("-")[1];
	}
	
	freightviewModel.getShipmentDataFromSalesOrderWithSO(salesIdNumberOnly).then((data)=>{

		if(data !== null && data!==undefined){

			var tracking=[];
	  		//sort the tracking.history

	  		if(typeof data.tracking!="undefined"){
	  			var tracking=data.tracking.history.sort(function(a,b){
	  				return new Date(b.createdDate)-new Date(a.createdDate);
	  			})
	  		}
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
	  	
	  	}else{
	  		freightviewModel.getShipmentDataFromSalesOrderWithoutSO(salesIdNumberOnly).then((data)=>{
	  			if(data !== null){
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
		  	},(error)=>{
		  		res.status(404).send("no records");
		  	});
	  	}
	},function(error){

		res.status(404).send({
	  	
	  		status : 404,
	  		errorMessage : 'No shipping information was available for this sales Order. Please try with different one!'
	  	
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
	  		errorMessage : 'No shipping information was available for this sales Order. Please try with different one!'
	  	
	  	})
	
	})
}


module.exports = {
	shipmentDataFromSalesOrder,
	shipmentDataFromPickUpDate
}
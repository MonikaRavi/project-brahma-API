var request = require("request")

function getShipmentDataFromFreightView(req,res){
	var salesOrder=req.params.salesOrder;
	var options = {
	  method: "GET",
	  url: "https://www.freightview.com/api/v1.0/shipments/",
	  qs: {
	    pro: 123,
	    bol: 456,
		ref: salesOrder,
	    pickupDate:"2017-02-12"
	  },
	  auth: {
	    "user": "15aaf4dfbdb4edd7fd20bc5bc71d8f7bd458ddd945a"
	  },
	  headers: {
	    "content-type": "application/json"
	  }
	}
	
	request(options, function (err, response, body) {
	  if (err) throw err;
	  data=JSON.parse(body);
	  // console.log(data.shipments.length);
	  if(data.shipments.length!==0){
	  	 res.send({
	  	 	carrier:data.shipments[0].rate.carrier,
	  	 	total:data.shipments[0].rate.total,
	  	 	charges:data.shipments[0].rate.charges,
	  	 	referenceNumber:data.shipments[0].origin.referenceNumber,
	  	 	destination: data.shipments[0].destination.address+ data.shipments[0].destination.city + data.shipments[0].destination.state,
	  	 	company:data.shipments[0].destination.company,
	  	 	tracking:data.shipments[0].tracking
	  	 });
	  }else{
	  	res.status(400).send({
	  		status:400,
	  		errorMessage: 'No shipping information was available for this sales Order. Please try with different one!'
	  	})
	  }
	 
	})
	
}

module.exports={
	getShipmentDataFromFreightView
}
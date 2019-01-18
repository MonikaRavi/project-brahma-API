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
	  res.send(JSON.parse(body));
	})
	
}

module.exports={
	getShipmentDataFromFreightView
}
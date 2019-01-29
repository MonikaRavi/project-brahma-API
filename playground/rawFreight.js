var request = require("request")

var options = {
  method: "GET",
  url: "https://www.freightview.com/api/v1.0/shipments/",
  qs: {
  //   pro: 123,
  //   bol: 456,
		    ref: 'SO-1889465'
    // pickupDate="2017-02-12"
  },
  auth: {
    "user": "15aaf4dfbdb4edd7fd20bc5bc71d8f7bd458ddd945a"
  },
  headers: {
    "content-type": "application/json"
  }
}

request(options, function (err, res, body) {
  if (err) throw err;
  var body=JSON.parse(body);
  console.log(body.shipments[0].origin)
})
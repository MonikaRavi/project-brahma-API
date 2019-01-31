var request = require("request")

var options = {
  method: "GET",
  url: "https://www.freightview.com/api/v1.0/shipments/",
  qs: {
  //   pro: 123,
  //   bol: 456,
		    ref: 'SO-1783822'
    // pickupDate="2017-02-12"
  },
  auth: {
    "user": "15aaf4dfbdb4edd7fd20bc5bc71d8f7bd458ddd945a"
  },
  headers: {
    "content-type": "application/json"
  }
}

new Promise((resolve, reject)=>{
  
  request(options, function (err, res, body) {
 
    if (err){
      reject(err);
    }
    else{
      
      var body=JSON.parse(body);
      
      // console.log('body.shipments[0]:',body.shipments[0]);
      // console.log('type of body.shipments[0]:',typeof body.shipments[0]);

      if(typeof body.shipments[0]=="undefined"){ //meaning no data is returned ie. body.shipments[0]={[]}
        console.log('typeof body:',typeof body);
        console.log('typeof body.shipments[0]:',typeof body.shipments[0]);
        resolve (body);

      }else{
        
        resolve(body.shipments[0]);

      }

    } 
})
}).then(function(data){
  console.log('data*:',data);
},(error)=>{
  console.log('error*:',error);
})

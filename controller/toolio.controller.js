var AX2009Model=require('./../model/AX2009.model');

var accountSid = 'ACb973c5d88cf5d8fab152667e2e99b642'; 
var authToken = 'f04f9e8ff3bb7a35ce841bbfbef6a286';

//require the Twilio module 
var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

var reminder = function(req,res) {

	var name;
	var phone;
	var email;
	// var bod;
	console.log('salesid:',req.params.salesId);
	AX2009Model.getCustomerDetailsFromSalesId(req,res).then(function(result){
		if(result.recordsets[0].length!==0){
			
			name=JSON.stringify(result.recordsets[0][0].Customer),
			phone=JSON.stringify(result.recordsets[0][0].PHONE),
			email=JSON.stringify(result.recordsets[0][0].EMAIL)
			console.log('name:',name, 'phone',phone,'email',email);
			// bod=name + phone + email;	
		}
		const bod=name+phone+email;	
		console.log('body',bod);
		client.messages.create({ 
		    to: "5615739645", 
		    from: "+18504800786",
		    body: `New order from customer. Customer Details: ${bod}`, 
		  }, function(err, message) { 
		    console.log(err); 
		  });
		res.send('message sent');
	},function(error){
		console.log(error);
	})

  
};


var call=function(req,res){
	
	const client = require('twilio')(accountSid, authToken);

	client.calls.create(
	  {
	    url: 'http://demo.twilio.com/docs/voice.xml',
	    to: '7754209818',
	    from: '+18504800786',
	  },
	  
	  (err, call) => {
	    process.stdout.write(call.sid);
	  }
	);
}

module.exports={
	reminder,
	call
}
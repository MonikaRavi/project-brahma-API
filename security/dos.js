var RateLimit=require('express-rate-limit');

var limiter=new RateLimit({
	windowMS:1*60*1000, //1 minutes
	max:10, //limit each IP to 100 requests per windwoMS
	delayMs:0, //disable delaying -- full speed until the max limit is reached
	message:'Error: Too many requests, your IP has been flagged!!',
	// onLimitReached:function(req,res,options){
	// 	console.log('limit reached@!');
		
	// 	//console.log(req);

	// 	res.send(`ALERT!!!! \n Your ip address: ${req.ip} has been flagged to CIA for illegal activities!!`);

	// }
});

module.exports={
	limiter
}
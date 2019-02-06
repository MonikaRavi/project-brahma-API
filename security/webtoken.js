var jwt=require('jsonwebtoken');
var authTokenFile=require('./../configuration/authentication.config.js');

function token(token){
	
	var decoded=jwt.verify(token,'sampleSalt');
	return new Promise((resolve,reject)=>{
		if(decoded.user==authTokenFile.authData)
		resolve(true);
	else
		reject(false);
	})	
}


module.exports={
	token
}

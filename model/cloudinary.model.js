var cloudinary=require('cloudinary');

cloudinary.config({
	cloud_name: 'hawscorp',
	api_key: '153894712273838',
	api_secret: 'DvEV7CnuAl6ORWb5e1noNcHyh5I'
})


var getPictures=function(itemId){	

	return new Promise((resolve,reject)=>{
		
		// cloudinary.v2.api.resources_by_tag("guitar",{ resource_type: 'raw'}, function(error, result){
			 	
		//  	if(error) 
		//  		reject(error);
		//  	else
		//  		resolve(result);

		//  	console.log(result.resources); 
		
		// });
		// cloudinary.v2.api.resources(
  // 			{ type: 'upload'}, 
  // 				function(error, result){console.log(result); 
  // 					resolve(result);
  // 				});
			
  		// console.log(cloudinary.image("Products/samples/CuriousKeeda-Musical-Instruments-Featured-Imahe.jpg"));

  		// cloudinary.v2.api.resources(
  		// 	function(error, result){console.log(result)
  		// 		resolve(result);});

  		cloudinary.v2.search.expression("resource_type:image").execute(
  function(error, result){console.log(result)

  	resolve(result)});

	});

}

module.exports={
	getPictures
}


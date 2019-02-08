var cloudinary=require('cloudinary');

cloudinary.config({
	cloud_name: 'hawscorp',
	api_key: '153894712273838',
	api_secret: 'DvEV7CnuAl6ORWb5e1noNcHyh5I'
})


var getPictures=function(itemId){	
	// console.log('itemId :',itemId);
	return new Promise((resolve,reject)=>{	
		var url='Asset/'+`${itemId}`+'.jpg';
		// console.log('url:',url);
		var returnedURL=cloudinary.image(url);
		// console.log('returnedURL:',returnedURL);
		var formatURL=returnedURL.slice(0,14)+'s'+returnedURL.slice(14);
		var formattedURL=formatURL.slice(0,41)+'-'+formatURL.slice(41);

		console.log(formattedURL);
		             

		resolve(formattedURL);


	});

}

module.exports={
	getPictures
}


var request = require("request")
var fs=require('fs');

var configFreightView = require('./../configuration/freightview.config');






Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    // console.log('primitive:',date);
    date.setDate(date.getDate() + days);
    // if(date===)
    return date;
}

function getDates(startDate, stopDate) {
    var dateArray = new Array();
    // var dateTemp;
    var currentDate = startDate;
    fs.writeFile("./SOFreightSalesforce.txt","",'utf8', function(){})

    currentDate = currentDate.addDays(1);
    var dateTemp=currentDate.getFullYear() + '-' + (currentDate.getMonth()+1) + '-' + currentDate.getDate();

    while (currentDate <= stopDate) {
        // dateArray.push(new Date (currentDate));
        
        //console.log(currentDate.getFullYear() + '-' + (currentDate.getMonth()+1) + '-' + currentDate.getDate());
        
        var url = "https://www.freightview.com/api/v1.0/shipments/";
		
		var pickupDate = dateTemp;
		console.log('Given Date:++++++',pickupDate);
		console.log('typeof:*',typeof(pickupDate));

		var options = {
	 
		    method : "GET",
		    url : url,
		    qs : {
		    
		      	// pro : pro,
		      	// bol : bol,
		      	// ref:salesOrder,
		      	pickupDate:pickupDate  	
		  	},
		  	
		  	auth : {
		    	"user" : "15aaf4dfbdb4edd7fd20bc5bc71d8f7bd458ddd945a"
		  	},

		  	headers : {
		    	"content-type" : "application/json"
			}

		}
		
		// var configFrieghtView = configFreightView.getFrieghtViewConfig(url," ",pickupDate);
		console.log('options:',JSON.stringify(options));

		request(options, function (err, response, body) {
	  		
	  		if (err) console.log(err);
	  		
	  		var body=JSON.parse(body);
	  		
	  		if(body.shipments.length !== 0){
	  			// console.log('given date:_______',pickupDate);
	  			// console.log(body.shipments[0].pickupDate);
	  			console.log(body.shipments[0].origin.referenceNumber + " " + body.shipments[0].pickupDate);


	  			var txt=body.shipments[0].origin.referenceNumber + " " + pickupDate + '\n';

	  			fs.appendFile("./SOFreightSalesforce.txt",txt,'utf8', function(){})

	  			currentDate = currentDate.addDays(1);
        		dateTemp=currentDate.getFullYear() + '-' + (currentDate.getMonth()+1) + '-' + currentDate.getDate();
	  		
	  		}else{
	  		
	  			console.log('error');
	  		
	  		}
	  			 
		})		
		
    }

}

getDates(new Date("2019-01-20"),new Date("2019-01-24"));
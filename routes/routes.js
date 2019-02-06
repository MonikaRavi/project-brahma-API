var express = require('express');
var router = express.Router();
var path = require('path');

//require controllers
	// var aggregateDataController=require('./../controller/aggregate.controller');
	var salesforceController = require('./../controller/salesforce.controller');
	var AX2009Controller = require('./../controller/AX2009.controller');
	var AX365Controller = require('./../controller/AX365.controller');
	var freightViewController = require('./../controller/freightview.controller');
	var twilioController = require('./../controller/twilio.controller.js');
	var cloudinaryController=require('./../controller/cloudinary.controller.js');

	var webtoken=require('./../security/webtoken.js');


		//API end point for landing page
	var viewPath = __dirname + '/../public/';
	router.get('/', function(req, res) {
	  res.sendFile(path.resolve(viewPath + "home.html"));
	});

		//authentication
	router.use(function(req,res,next){
		var login=webtoken.token(req.header('x-auth')).then((result)=>{
			if(result){
				console.log('authenticated!');
				next();
			}
		},(error)=>{
			res.send('Invalid Token');
		});	
	})


		//get sales order list from AX2009
	router.route('/v1/AX2009/salesOrderList').get(AX2009Controller.salesOrderList);

		//get customer details from sales Id for AX2009
	router.route('/v1/AX2009/customerFromSales/:salesId').get(AX2009Controller.customerDetailsFromSalesId); //SO00000155 (correct)

		//get sales order details from sales Id for AX2009
	router.route('/v1/AX2009/salesDetails/:salesId').get(AX2009Controller.salesOrderDetailsFromSalesID); //SO-1787116
		
		//get customer info and the related sales list for an account for AX2009
	router.route('/v1/AX2009/customerSalesList/:Account').get(AX2009Controller.customerSalesList);  //00764

		//get on hand items from inventory
	router.route('/v1/AX2009/Inventory/onHand/:itemId').get(AX2009Controller.onHand); 

		//get invoice details from salesId
	router.route('/v1/AX2009/invoiceDetails/:salesId').get(AX2009Controller.invoiceDetail);

	router.route('/v1/AX2009/salesHeaders/:salesId').get(AX2009Controller.salesHeaders);

	router.route('/v1/AX2009/commissionDetails/:salesId').get(AX2009Controller.commissionDetails);
	
	

		//get sales order details from sales id for Salesforce
	router.route('/v1/Salesforce/salesDetails/:salesId').get(salesforceController.salesOrderDetailsFromSalesId) //SO-1787116

		//get opportunity for an account for salesforce
	router.route('/v1/Salesforce/Opportunities/:Account').get(salesforceController.opportunity);  //00764  //c

		//get safety/plumbing accounts from salesforce 
	router.route('/v1/Salesforce/Distributor/:Type').get(salesforceController.accountsByType); //{safety,plumbing}  //c



		//get sales order list for a customer account for AX365
	// router.route('/v1/AX365/salesOrderListForCustomer/:account').get(AX365Controller.salesOrderlistForCustomer); //C000622

		//get top 50 sales order List from Avlis 
	 router.route('/v1/AX365/salesOrderList').get(AX365Controller.salesOrderList);

	 	//get customer details from sales Id from Avlis
	 router.route('/v1/AX365/customerFromSales/:salesId').get(AX365Controller.customerDetailsFromSalesId);

	 	//get sales details from SalesId from Avlis
	 router.route('/v1/AX365/salesDetails/:salesId').get(AX365Controller.salesOrderDetailsFromSalesId);	



		//get shipping details from feightview using reference number(sales order)
	router.route('/v1/Freightview/shipmentDetailsFromSales/:salesOrder').get(freightViewController.shipmentDataFromSalesOrder);  //

		//get shipping details from freightview using pick up Date
	router.route('/v1/Freightview/shipmentDetailsFromDate/:pickUpDate').get(freightViewController.shipmentDataFromPickUpDate); 


	
		//send message from twilio
	router.route('/v1/Twilio/:salesId').get(twilioController.reminder); //send text message  //c

		//send voice call from twilio
	router.route('/v1/Twilio/').get(twilioController.call);  //c


		//get cloudinary pics
	router.route('/v1/Cloudinary/:itemId').get(cloudinaryController.pictures);

	

 module.exports = router;
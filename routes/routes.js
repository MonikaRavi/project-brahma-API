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


//API end point for landing page
	var viewPath = __dirname + '/../public/';
	router.get('/', function(req, res) {
	  res.sendFile(path.resolve(viewPath + "home.html"));
	});


//API EndPoints Version__1


		//get sales order list from AX2009
	router.route('/v1/AX2009/salesOrderList').get(AX2009Controller.AX2009SalesOrderList);

		//get customer details from sales Id for AX2009
	router.route('/v1/AX2009/customerDetailsFromSalesId/:salesId').get(AX2009Controller.AX2009CustomerDetailsFromSalesId); //SO00000155 (correct)

		//get sales order details from sales Id for AX2009
	router.route('/v1/AX2009/salesOrderDetailsFromSalesId/:salesId').get(AX2009Controller.AX2009salesOrderDetailsFromSalesID); //SO-1787116

		//get sales order details from sales id for Salesforce
	router.route('/v1/salesforce/salesOrderDetailsFromSalesId/:salesId').get(salesforceController.salesOrderDetailsFromSalesId) //SO-1787116

		//get opportunity for an account for salesforce
	router.route('/v1/salesforce/opportunities/:account').get(salesforceController.opportunity);  //00764

		//get customer info and the related sales list for an account for AX2009
	router.route('/v1/AX2009/customerSalesList/:account').get(AX2009Controller.customerSalesList);  //00764

		//get sales order list for a customer account for AX365
	// router.route('/v1/AX365/salesOrderListForCustomer/:account').get(AX365Controller.salesOrderlistForCustomer); //C000622

		//get top 50 sales order List from Avlis 
	 router.route('/v1/AX365/salesOrderList').get(AX365Controller.salesOrderList);

	 	//get customer details from sales Id from Avlis
	 router.route('/v1/AX365/customerDetailsFromSalesId/:salesId').get(AX365Controller.customerDetailsFromSalesId);

	 	//get sales details from SalesId from Avlis
	 router.route('/v1/AX365/salesOrderDetailsFromSalesId/:salesId').get(AX365Controller.salesOrderDetailsFromSalesId);

		//get safety/plumbing accounts from salesforce 
	router.route('/v1/salesforce/distributor/:type').get(salesforceController.accountsByType); //{safety,plumbing}

		//get shipping details from feightview
	router.route('/v1/freightview/:salesOrder').get(freightViewController.shipmentDataFromFreightView);

		//send message from twilio
	router.route('/twilio/:salesId').get(twilioController.reminder); //send text message

		//send voice call from twilio
	router.route('/twilio/').get(twilioController.call);

 module.exports = router;
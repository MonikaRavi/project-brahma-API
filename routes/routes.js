var express = require('express');
var router = express.Router();
var path = require('path');

//require controllers
	// var aggregateDataController=require('./../controller/aggregate.controller');
	var salesforceController = require('./../controller/salesforce.controller');
	var AX2009Controller = require('./../controller/AX2009.controller');
	var AX365Controller = require('./../controller/AX365.controller');
	var freightViewController = require('./../controller/freightview.controller');
	var toolioController = require('./../controller/toolio.controller.js');


//API end point for landing page
	var viewPath = __dirname + '/../public/';
	router.get('/', function(req, res) {
	  res.sendFile(path.resolve(viewPath + "home.html"));
	});


//API EndPoints Version__1


		//get sales order list from AX2009
	router.route('/v1/AX2009/salesOrderlist').get(AX2009Controller.AX2009SalesOrderList);

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
	router.route('/v1/AX365/salesOrderlist/:account').get(AX365Controller.salesOrderlist); //C000622

		//get safety/plumbing accounts from salesforce 
	router.route('/v1/salesforce/:type').get(salesforceController.accountsByType); //{safety,plumbing}

		//get shipping details from feightview
	router.route('/v1/freightview/:salesOrder').get(freightViewController.shipmentDataFromFreightView);

		//send message from twilio
	router.route('/twilio/:salesId').get(toolioController.reminder); //send text message

		//send voice call from twilio
	router.route('/twilio/').get(toolioController.call);

 module.exports = router;
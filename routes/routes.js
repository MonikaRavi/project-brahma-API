var express=require('express');
var router=express.Router();
var path = require('path');

//require controllers
	var aggregateDataController=require('./../controller/aggregate.controller');
	var salesforceController=require('./../controller/salesforce.controller');
	var AX2009Controller=require('./../controller/AX2009.controller');
	var AX365Controller=require('./../controller/AX365.controller');


//API end point for landing page
	var viewPath = __dirname + '/../public/';
	router.get('/', function(req, res) {
	  res.sendFile(path.resolve(viewPath + "home.html"));
	});


//API EndPoints Version__1


		//get sales order list from AX2009
	router.route('/v1/AX2009/salesOrderlist').get(AX2009Controller.AX2009SalesOrderList);

		//get customer details from sales Id for AX2009
	router.route('/v1/AX2009/customerDetailsFromSalesId/:salesId').get(AX2009Controller.AX2009CustomerDetailsFromSalesId); //SO00000155

		//get sales order details from sales Id for AX2009
	router.route('/v1/AX2009/salesOrderDetailsFromSalesId/:salesId').get(AX2009Controller.AX2009salesOrderDetailsFromSalesID); //SO-1787116

		//get sales order details from sales id for Salesforce
	router.route('/v1/salesforce/salesOrderDetailsFromSalesId/:salesId').get(salesforceController.salesOrderDetailsFromSalesId) //SO-1787116

		//aggregate the opportunities for an account from SF, AX365, AX2009 with a single request 
	router.route('/v1/AX2009_SF_AX365/opportunities/:account').get(aggregateDataController.aggregateData);  //00764

		//get opportunity for an account for salesforce
	router.route('/v1/salesforce/opportunities/:account').get(salesforceController.opportunity);  //00764

		//get opportunity for an account for AX2009
	router.route('/v1/AX2009/opportunities/:account').get(AX2009Controller.opportunity);  //00764

		//get opportunity for an account for AX365
	router.route('/v1/AX365/opportunities/:account').get(AX365Controller.opportunity); //00764

		//get safety/plumbing accounts from salesforce 
	router.route('/v1/salesforce/:type').get(salesforceController.accountsByType); //{safety,plumbing}





 module.exports=router;
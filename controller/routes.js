var express=require('express');
var router=express.Router();
var path = require('path');

//require controllers
	var aggregateDataController=require('./aggregate.controller');
	var salesLeadController=require('./salesLead.controller.js'); //intersection
	var salesforceController=require('./salesforce.controller');
	var AX2009Controller=require('./AX2009.controller');
	var AX365Controller=require('./AX365.controller');


//API end point for landing page
	var viewPath = __dirname + '/../public/';
	router.get('/', function(req, res) {
	  res.sendFile(path.resolve(viewPath + "home.html"));
	});


//API EndPoints Version__1
//is not used right now, just for previous lookup
	router.route('/v1/opportunities/:account').get(aggregateDataController.aggregateData);
	router.route('/v1/salesforce/:type').get(salesforceController.accountsByType);
	router.route('/v1/salesLeads/:salesOrder').get(salesLeadController.getSalesLead);
	router.route('/v1/AX2009/list').get(AX2009Controller.AX2009SalesOrderList);
	router.route('/v2/AX2009/customerDetails/:salesId').get(AX2009Controller.AX2009CustomerDetailsFromSales);


//API Endpoints Version__2
//currently in use
	router.route('/v2/salesforce/:type').get(salesforceController.accountsByType);

//	router.route('/v2/AX2009_SF_AX365/opportunities/:account').get(aggregateDataController.aggregateData);

	router.route('/v2/AX2009_SF/salesLeads/:salesOrder').get(salesLeadController.getSalesLead);

	router.route('/v2/AX2009/salesOrderList').get(AX2009Controller.AX2009SalesOrderList);

	router.route('/v2/AX2009/customerDetails/:salesId').get(AX2009Controller.AX2009CustomerDetailsFromSales);

	router.route('/v2/AX365/customerDetails/:salesId').get(AX365Controller.customerDetails);






 module.exports=router;
var express=require('express');
var router=express.Router();
var path = require('path');

//require controllers
	var aggregateDataController=require('./aggregate.controller');
	var intersectionController=require('./intersection.controller.js');
	var salesforceController=require('./salesforce.controller');
	var AX2009Controller=require('./AX2009.controller');


//API end point for landing page
	var viewPath = __dirname + '/../public/';
	router.get('/', function(req, res) {
	  res.sendFile(path.resolve(viewPath + "home.html"));
	});


//API EndPoints Version__1
	router.route('/opportunities/:account').get(aggregateDataController.aggregateData);
	router.route('/salesforce/:type').get(salesforceController.getAccounts);
	router.route('/salesLeads/:salesOrder').get(intersectionController.intersection);
	router.route('/AX2009/list').get(AX2009Controller.AX2009List);
	router.route('/AX2009/customerDetails/:salesId').get(AX2009Controller.AX2009CustomerDetails);


//API Endpoints Version__2
	router.route('/v2/salesforce/:type').get(salesforceController.getAccounts);

	router.route('/v2/AX2009_SF_AX365/opportunities/:account').get(aggregateDataController.aggregateData);

	router.route('/v2/AX2009_SF/salesLeads/:salesOrder').get(intersectionController.intersection);

	router.route('/v2/AX2009/dashboardList').get(AX2009Controller.AX2009List);

	router.route('/v2/AX2009/customerDetails/:salesId').get(AX2009Controller.AX2009CustomerDetails);






 module.exports=router;
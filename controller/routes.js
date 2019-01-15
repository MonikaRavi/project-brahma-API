var express=require('express');
var router=express.Router();
var path = require('path');

//require controllers
	var aggregateDataController=require('./aggregate.controller');
	var salesforceController=require('./salesforce.controller');
	var AX2009Controller=require('./AX2009.controller');
	var AX365Controller=require('./AX365.controller');


//API end point for landing page
	var viewPath = __dirname + '/../public/';
	router.get('/', function(req, res) {
	  res.sendFile(path.resolve(viewPath + "home.html"));
	});


//API EndPoints Version__1


	router.route('/v3/AX2009_SF_AX365/opportunities/:account').get(aggregateDataController.aggregateData);  //00764

	router.route('/v3/AX2009/salesOrderlist').get(AX2009Controller.AX2009SalesOrderListNew);

	router.route('/v3/AX2009/customerDetailsFromSalesId/:salesId').get(AX2009Controller.AX2009CustomerDetailsFromSalesId); //SO00000155

	router.route('/v3/AX2009/salesOrderDetailsFromSalesId/:salesId').get(AX2009Controller.AX2009salesOrderDetailsFromSalesID); //SO-1787116

	router.route('/v3/salesforce/salesOrderDetailsFromSalesId/:salesId').get(salesforceController.salesOrderDetailsFromSalesId) //SO-1787116

	router.route('/v3/salesforce/opportunities/:account').get(salesforceController.opportunity);  //00764

	router.route('/v3/AX2009/opportunities/:account').get(AX2009Controller.opportunity);  //00764

	router.route('/v3/AX365/opportunities/:account').get(AX365Controller.opportunity); //00764

	router.route('/v3/salesforce/:type').get(salesforceController.accountsByType); //{safety,plumbing}





 module.exports=router;
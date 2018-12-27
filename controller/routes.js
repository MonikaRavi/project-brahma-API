var express=require('express');
var router=express.Router();
var path = require('path');

//require controllers
var aggregateDataController=require('./aggregate.controller');
var intersectionController=require('./intersection.controller.js');
var salesforceController=require('./salesforce.controller');
var AX2009Controller=require('./AX2009.controller');


//for landing page
var viewPath = __dirname + '/../public/';
router.get('/', (req, res) => {
  res.sendFile(path.resolve(viewPath + "home.html"));
});


//API EndPoints Version__1
router.route('/opportunity/:account').get(aggregateDataController.aggregateData);
router.route('/salesforce/:type').get(salesforceController.getAccounts);
router.route('/intersection/:salesOrder').get(intersectionController.intersection);
router.route('/list').get(AX2009Controller.AX2009List);
router.route('/customers/:account').get(AX2009Controller.AX2009CustomerController);

//API Endpoints Version__2
router.route('/v2/salesforce/:type').get(salesforceController.getAccounts);

router.route('/v2/AX2009_SF_AX365/opportunities/:account').get(aggregateDataController.aggregateData);

router.route('/v2/AX2009_SF/intersection/:salesOrder').get(intersectionController.intersection);

router.route('/v2/AX2009/list').get(AX2009Controller.AX2009List);

router.route('/v2/AX2009/customers/:account').get(AX2009Controller.AX2009CustomerController);








 module.exports=router;
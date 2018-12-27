var express=require('express');
var router=express.Router();

var aggregateDataController=require('./controller/aggregate.controller');
var intersectionController=require('./controller/intersection.controller.js');
var listController=require('./controller/list.controller.js');
var salesforceController=require('./controller/salesforce.controller');
var AX2009Controller=require('./controller/AX2009.controller');




var viewPath = __dirname + '/public/';
router.get('/', (req, res) => {

  res.sendFile(viewPath + "home.html");});

router.route('/salesforce/:type').get(salesforceController.getAccounts);

router.route('/opportunity/:account').get(aggregateDataController.aggregateData);

router.route('/intersection/:salesOrder').get(intersectionController.intersection);

router.route('/list').get(listController.listFunc);

router.route('/customerDetail/:account').get(AX2009Controller.AX2009CustomerController);




 module.exports=router;
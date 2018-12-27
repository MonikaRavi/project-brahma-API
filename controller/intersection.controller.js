const config9=require('../configuration/configAX2009.js');
const intersectionModel=require('../model/intersection.model');



function intersection(req,res){
		
    var values= Promise.all([intersectionModel.AX2009Func(),intersectionModel.SFFunc()]).then(function(values){
    	res.send({
    				AX2009:values[0][0],
    				SalesForce:{
    					Name:values[1].Name,
    					Amount:values[1].Amount,
    					ERP_Sales_Order_Number__c:values[1].ERP_Sales_Order_Number__c,
    					ERP_Final_Amount__c:values[1].ERP_Final_Amount__c,
    					AccountID:values[1].AccountID,
    					CloseDate:values[1].CloseDate,
    					Opportunity_State_Province__c:values[1].Opportunity_State_Province__c
    				}
    			});
    });	
   
}

module.exports={
	intersection
}
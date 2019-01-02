const config9=require('../configuration/configAX2009.js');
const intersectionModel=require('../model/intersection.model');



function intersection(req,res){
		
    //wait for Promises from AX2009 and SalesForce to be fulfilled, and format the data properly and return the data to user
        var values= Promise.all([intersectionModel.AX2009Func(),intersectionModel.SFFunc()]).then(function(values){

        	res.send({
        				AX2009:values[0].recordsets[0][0],
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
const config9=require('../configuration/configAX2009.js');
const salesLeadModel=require('../model/salesLead.model');


//return the salesLead
function getSalesLead(req,res){//salesLead
		
    //wait for Promises from AX2009 and SalesForce to be fulfilled, and format the data properly and return the data to user
        var values= Promise.all([salesLeadModel.getSalesOrder(),salesLeadModel.getSalesDetails()]).then(function(values){

        	res.send({
        				AX2009:values[0].recordsets[0][0],
        				SalesForce:{
                            
        					Name:values[1].records[0].Name,
        					Amount:values[1].records[0].Amount,
        					ERP_Sales_Order_Number__c:values[1].records[0].ERP_Sales_Order_Number__c,
        					ERP_Final_Amount__c:values[1].records[0].ERP_Final_Amount__c,
        					AccountID:values[1].records[0].AccountID,
        					CloseDate:values[1].records[0].CloseDate,
        					Opportunity_State_Province__c:values[1].records[0].Opportunity_State_Province__c
        				}
        			});
        });	
   
}

module.exports={
	getSalesLead
}
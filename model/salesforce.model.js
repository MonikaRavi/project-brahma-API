const sfConnection = require('../configuration/accessSF');
const utilityModel=require('./utility/utilityModel');
const request = require('request');

// gets sales details for a particular sales ID in salesforce
var getSalesDetailsFromSalesID=function(salesId){ //getSalesDetails

    var ourQuery=`select name, Amount, ERP_Sales_Order_Number__c, ERP_Final_Amount__c, AccountID, CloseDate, 
                                Opportunity_State_Province__c from Opportunity where ERP_Sales_Order_Number__c = '${salesId}' `;

    return utilityModel.SFQuery(ourQuery);
}


//gets opportunity for a particular account
var getOpportunity = function (accountName) { //qrySoql

    var query = `select  Name, probability, amount from Opportunity  where isClosed = false and AccountID in 
                                (select Id from Account where axaccountnum__c = '${accountName}' ) LIMIT 5`;

    //call database using Utility Function and format the data as required
        return new Promise(function(resolve, reject){

            utilityModel.SFQuery(query).then(function(result){
                
                var data = [];

                var dataArray = [];

                dataArray = result.records;

                result.records.forEach(function(element){

                    data.push({

                        name: element.Name,
                        probability: element.Probability,
                        amount: element.Amount
                    });

                });
            
            resolve(data);
        });
       }) 
}

//gets accounts of salesforce for a particular account type
var getAccounts = function(accountType) {//accounts

    //call SF database and format data as required
    
        return new Promise(function(resolve, reject) {

            sfConnection.getToken().then(function(result){
                console.log('token:',result);

                url = 'https://haws--iot.cs8.my.salesforce.com/services/apexrest/showAccounts/' + accountType

                request(url,
                    {
                        json: true,

                        auth: { bearer: result.accToken }

                    },
                    function(err, response, body){

                        if (err) {

                            console.log(err);

                            reject(err);
                        } else {

                            var dataObj = [];

                            body.forEach(function(element){
                                
                                dataObj.push({

                                    accountId : element.Id,
                                    Name : element.Name,
                                    Type : element.Type,
                                    Phone : element.Phone,
                                    Website : element.Website

                                })

                            });
                            
                            resolve(dataObj);

                        }

                    });

                },
            function(err){  
                console.log(err);
                reject(err);
            });

        });
}






module.exports = {

    getOpportunity,
    getAccounts,
    getSalesDetailsFromSalesID

};

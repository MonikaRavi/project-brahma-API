const sfConnection = require('../configuration/accessSF');
const request = require('request');


var querySoql = function (accountName) {

    return new Promise(function(resolve, reject) {
        
            sfConnection.getToken(function(err, res) {

                if (res.accToken) {

                    var query = `select  Name, probability, amount from Opportunity  where isClosed = false and AccountID in 
                                (select Id from Account where axaccountnum__c = '${accountName}' ) LIMIT 5`

                    sfConnection.conn.query(query, function (err, result) {

                        if (err) { 
                            
                            console.log(err);
                            reject(err); 
                        }
                        
                        var data = [];

                        var dataArray = [];

                        dataArray = result.records;

                        result.records.forEach(element => {

                            data.push({

                                name: element.Name,
                                probability: element.Probability,
                                amount: element.Amount
                            });

                        });

                        resolve(data);

                    });

                } else {

                    console.log(err);
                }

            });

        });
}


var accounts = function(accountType) {

    return new Promise(

        (resolve, reject) => {

            sfConnection.getToken(function(err, resp){

                if (err) {

                    console.log(err);

                    reject(err);

                } else {

                    url = 'https://haws--iot.cs8.my.salesforce.com/services/apexrest/showAccounts/' + accountType

                    request(url,
                        {
                            json: true,

                            auth: { bearer: resp.accToken }

                        },
                        function(err, response, body){

                            if (err) {

                                console.log(err);

                                reject(err);
                            } else {

                                var dataObj = [];

                                body.forEach(element => {
                                    
                                    dataObj.push({

                                        accountId : element.Id,
                                        Name : element.Name,
                                        Type : element.Type,
                                        Phone : element.Phone,
                                        Website : element.Website

                                    })

                                });

                                resolve(JSON.stringify(dataObj));

                            }

                        });

                }

            }
            )

        }

    );

}


module.exports = {

    querySoql,
    accounts

};

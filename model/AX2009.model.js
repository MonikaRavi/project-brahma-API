const sql=require('mssql');
const config=require('../configuration/configAX2009.js');

function accountAX2009Func(req,res){
    var account=req.params.account;
    return new Promise(function(resolve,reject){
    
		var config1=config.config;

        sql.connect(config1, function (err) {    
        
            if (err) console.log(err);
            
            var request = new sql.Request();           
             
            ourQuery = `select top 5 SalesID, createdDate,Amount,CustAccount, Customer from SalesSummary_Hws where CustAccount='${account}' order by createdDate desc`

            request.query(ourQuery, function (err, recordset) {
                
                if (err) reject(err);
                
                var customer={
                                CustAccount:recordset.recordsets[0][1].CustAccount,
                                Customer:recordset.recordsets[0][1].Customer
                              };

                var tempData=[];
                recordset.recordsets[0].forEach(customer=>{
                    var tempCus={
                        SalesId:customer.SalesID,
                        createdDate:customer.createdDate,
                        Amount:customer.Amount
                    }
                    tempData.push(tempCus);
                });
                
                resolve(
                        {
                            customer: customer,
                            data: tempData
                        }
                );

                sql.close();
            
             });
        
        });
        
	})

}

function customerFunc(req,res){
    var account=req.params.account;
    return new Promise((resolve,reject)=>{
    
        console.log('account:',account);
        //var config1=config9.config;
        var config1={
                user: 'nodeapp',
                password: 'traynor_1906',
                server: 'HWSSQL3', 
                database: 'HawsBusinessAnalysis'
            };
        sql.connect(config1, function (err) {    
        
            if (err) console.log(err);
            
            var request = new sql.Request();           
             
            ourQuery = `select TOP 10 SALESID, CUSTACCOUNT , Customer, PHONE, EMAIL, ADDRESS, RSD from Customer_SalesID 
            where SALESID='${account}'`;

            request.query(ourQuery, function (err, recordset) {
                
                if (err) reject(err);
                
                //console.log(recordset.recordsets[0]);    

                resolve(recordset.recordsets[0]);                            
           
                sql.close();
            
             });
        
            });
        })
}

function listFunc(req,res){
    return new Promise((resolve,reject)=>{
    
            console.log('hi');
            // var config1=config9.config;
            var config1={
                user: 'nodeapp',
                password: 'traynor_1906',
                server: 'HWSSQL3', 
                database: 'HawsBusinessAnalysis'
            };
            sql.connect(config1, function (err) {    
            
                if (err) console.log(err);

                
                var request = new sql.Request();           
                 
                ourQuery = `select distinct A.SALESID, SALESNAME, CREATEDDATETIME, Customer, 

                                ITEMID ,ITEMNAME, SALESQTY , LINEAMOUNT, SalesStatus

                                from SalesDetail_hws A join temp_SOSF B on A.SALESID = B.SALESID`;

                request.query(ourQuery, function (err, recordset) {
                    
                    if (err) reject(err);
                    
                     console.log(recordset.recordsets[0]);    

                    resolve(recordset.recordsets[0]);                            
               
                    sql.close();
                
                 });
            
            });
        })
}


module.exports={
	accountAX2009Func,
    customerFunc,
    listFunc
}
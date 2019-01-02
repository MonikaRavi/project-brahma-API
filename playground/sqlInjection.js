const sql=require('mssql');

   
    var config1={
        user: 'nodeapp',
        password: 'traynor_1906',
        server: 'HWSSQL3', 
        database: 'HawsBusinessAnalysis'
    }

        sql.connect(config1, function (err) {    
        
            if (err) console.log(err);

            var value='00764';
            
            var request = new sql.Request();     

            request.input('custAccount',sql.VarChar,value);      
             
            // ourQuery = "select top 5 SalesID, createdDate,Amount,CustAccount, Customer from SalesSummary_Hws where CustAccount = :CustAccount order by createdDate desc";

            request.query('select top 5 SalesID, createdDate,Amount,CustAccount, Customer from SalesSummary_Hws where CustAccount = @custAccount order by createdDate desc', 
                function (err, recordset) {
                
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
                
                console.log(
                        {
                            customer: customer,
                            data: tempData
                        }
                );

                sql.close();
            
             });
        
        });
        


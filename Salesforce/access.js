var jsforce = require('jsforce');
var configSF=require('./configSF.js');

var conn = new jsforce.Connection({
  oauth2:configSF.oauth
});

//callback function to get the token 

var getToken = (callback)=>{

    //var securityToken = 'JDmYHNZGLnsTocy1MtePvltqB';  //received from Salesforce 
  var securityToken=configSF.securityToken.token;
  conn.login('systems@hawsco.com.iot', 'SF18r3s3t'+securityToken, function (err, userInfo) { //use security token to use SF in a browser or desktop app
    if (err) { 
      
      console.log(err);

      callback(err); 
    
    } else if (conn.accessToken){

      //console.log(conn.accessToken);

      callback(undefined, {   // returning NULL as error and json object with access token and Instance Url

        accToken: conn.accessToken,
        url: conn.instanceUrl

      });

    }
 
        
    });
  
  }

module.exports = {

    getToken, conn
};

 
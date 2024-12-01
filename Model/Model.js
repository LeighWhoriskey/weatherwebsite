var mysql = require('mysql');


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'weatherdb2023',
  //remove this to work on your machine or change to 3306
  port:3306
});

connection.connect(function(err){
	if(err) throw err;
	console.log(`Sucessfully connected to Weather2023 Database`);
});


exports.GetSites = function(req,res){
  try{
    connection.query("SELECT * FROM sites ORDER BY site_name", function(err, rows, fields) {
      if (err) throw err;
      res.send(JSON.stringify(rows));
      }
    );
  }catch(err){
    console.log(err);
  }
}

exports.GetSitesonMap = function(req,res,data){
  try{
    connection.query("SELECT * FROM sites Where site_name='"+data.name+"'", function(err, rows, fields) {
      if (err) throw err;
      res.send(JSON.stringify(rows));
      }
    );
  }catch(err){
    console.log(err);
  }
}

exports.UpdateSite = function(req,res,data){
  try{
    connection.query("Update sites SET site_name='"+data.newName+"' Where site_name='"+data.name+"'", function(err, rows, fields) {
      if (err) throw err;
      res.send(JSON.stringify(rows));
      }
    );
  }catch(err){
    console.log(err);
  }
}

exports.GetDailyStats = function(req,res){
  try{
    connection.query("SELECT * FROM weatherdata WHERE datenow='2023-04-06' AND site_name='M1 Dublin Airport'", function(err, rows, fields) {
      if (err) throw err;
      res.send(JSON.stringify(rows));
      }
    );
  }catch(err){
    console.log(err);
  }
}

exports.DailyStats = function(req,res,data){
  try{
    connection.query("SELECT * FROM weatherdata WHERE datenow='"+data.date +"' AND site_name='"+data.name +"' ORDER BY timenow", function(err, rows, fields) {
      if (err) throw err;
      res.send(JSON.stringify(rows));
      }
    );
  }catch(err){
    console.log(err);
  }
}

exports.GetStats = function(req,res){
  try{
    var q1 = "SELECT site_name, air_temperature as low_air FROM weatherdata WHERE air_temperature IS NOT NULL ORDER BY air_temperature ASC LIMIT 1";
    var q2 = "SELECT site_name, air_temperature as high_air FROM weatherdata WHERE air_temperature IS NOT NULL ORDER BY air_temperature DESC LIMIT 1";
    var q3 = "SELECT site_name, wind_speed FROM weatherdata WHERE wind_speed IS NOT NULL ORDER BY wind_speed DESC LIMIT 1";
    var q4 = "SELECT MIN(air_temperature) AS min_air, MAX(air_temperature) AS max_air, AVG(air_temperature) as avg_air,"+ 
              "MIN(wind_speed) as min_wind, MAX(wind_speed) as max_wind, AVG(wind_speed) as avg_wind," +
              "MIN(road_surface_temperature) as min_road, MAX(road_surface_temperature) as max_road, AVG(road_surface_temperature) as avg_road FROM weatherdata";

    var responseArray = new Array();

    connection.query(q1, function(err, rows, fields) {
      if (err) throw err;
      responseArray.push(rows);      
    });

    connection.query(q2, function(err, rows, fields) {
      if (err) throw err;
      responseArray.push(rows);
    });

    connection.query(q3, function(err, rows, fields) {
      if (err) throw err;
      responseArray.push(rows);      
    });

    connection.query(q4, function(err, rows, fields) {
      if (err) throw err;
      responseArray.push(rows); 
      res.send(JSON.stringify(responseArray));     
    });

  }catch(err){
    console.log(err);
  }
}

exports.GetWeatherData = function(req,res,data){
  try{console.log(data);
    connection.query("SELECT site_name, datenow, AVG(air_temperature) AS avg_air_temp, AVG(road_surface_temperature) "+
    "AS avg_road_temp, AVG(wind_speed) AS avg_wind_speed FROM weatherdata WHERE datenow='"+data.date+"' GROUP BY site_name;", function(err, rows, fields) {
      if (err) throw err;
      res.send(JSON.stringify(rows));
      }
    );
  }catch(err){
    console.log(err);
  }
}

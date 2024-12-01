$("document").ready(function(){

    $.getJSON("/stats",function(data){
        
        var cold = data[0][0]
        var warm =data[1][0]
        var wind = data[2][0]
        var national =data[3][0]

        

        $("#table1").append("<tr><td>Air Temperature</td><td>"+national.min_air +"</td><td> "+national.max_air +"</td><td>"+(Math.round(national.avg_air *10)/10) +"</td></tr>"+
        "<tr><td>Road Temperature</td><td>"+ national.min_road+"</td><td> "+national.max_road +"</td><td>"+(Math.round(national.avg_road *10)/10) +"</td></tr>"+
        "<tr><td>Wind Speed</td><td>"+ national.min_wind+"</td><td> "+national.max_wind +"</td><td>"+(Math.round(national.avg_wind *10)/10) +"</td></tr>");

        $("#table2").append("<tr><td>Coldest</td><td>"+cold.site_name +"</td><td> "+cold.low_air +"</td></tr>"+
        "<tr><td>Warmest</td><td>"+ warm.site_name+"</td><td> "+warm.high_air +"</td></tr>"+
        "<tr><td>Windest</td><td>"+ wind.site_name+"</td><td> "+wind.wind_speed +"</td></tr>");

    });
    
});
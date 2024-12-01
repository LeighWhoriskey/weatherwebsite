$("document").ready(function(){
    var url = window.location.href;
    var params = new URLSearchParams(url);
    var siteName = params.get("Site");
    var date = params.get("Date");
    var dataset = 0;
    var filteredData =0;
    $.ajax({
        url: "/DailyStats",
        cache: false,
        dataType: "json",
        type: "POST",
        data: {
            name: siteName,
            date: date
        },
        success: function(res){
            dataset = res
            $("#siteName").append("<h3>"+siteName+"</h3>");
            
            $.each(res,function(i,value){
                $("#table").append("<tr><td>"+date+"</td><td>"+value.timenow+"</td><td>"+ value.air_temperature+"</td><td>"+value.road_surface_temperature+"</td><td>"+value.wind_speed+"</td></tr>");
            });
        }
    });

    $("#up").on("click",function(){
        filteredData = dataset.sort((a,b) => b.air_temperature - a.air_temperature);
        
        $("#table").empty();
        $.each(filteredData,function(i,value){
            $("#table").append("<tr><td>"+date+"</td><td>"+value.timenow+"</td><td>"+ value.air_temperature+"</td><td>"+value.road_surface_temperature+"</td><td>"+value.wind_speed+"</td></tr>");
        });
    });
    
    $("#down").on("click",function(){
        filteredData = dataset.sort((a,b) => a.air_temperature - b.air_temperature);
        
        $("#table").empty();
        $.each(filteredData,function(i,value){
            $("#table").append("<tr><td>"+date+"</td><td>"+value.timenow+"</td><td>"+ value.air_temperature+"</td><td>"+value.road_surface_temperature+"</td><td>"+value.wind_speed+"</td></tr>");
        });
    });
});
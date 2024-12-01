$("document").ready(function(){

    var dataset=0;
    var windDirection ;

    $.getJSON("https://tiitrafficdata.azurewebsites.net/api/Weather",function(data){
        dataset = data.features;

        $.each(data.features,function(i,value){

            compassDirection(value);
            camera(value);
        });
    });

    $("#filter").on("input",function(){
        if($("#filter").val() ==""){

            $("#table").empty();

            $.each(dataset,function(i,value){

                compassDirection(value);
                camera(value);
            });
        }else{
            $("#table").empty();

             var filteredData = dataset.filter(function(d){if(d.properties.site_name.toLowerCase().includes($("#filter").val().toLowerCase()))return d});
             
             $.each(filteredData,function(i,value){

                compassDirection(value);
                camera(value);             
            });
        }
    });

    function compassDirection(value){
        if(value.properties.wind_direction_bearing < 22.5 && value.properties.wind_direction_bearing >= 0 || value.properties.wind_direction_bearing >=337.5 && value.properties.wind_direction_bearing <=360){
            windDirection = "↑";
        }else if(value.properties.wind_direction_bearing >= 22.5 && value.properties.wind_direction_bearing <67.5){
            windDirection ="↗";
        }else if(value.properties.wind_direction_bearing >= 67.5 && value.properties.wind_direction_bearing <112.5){
            windDirection ="→";
        }else if(value.properties.wind_direction_bearing >= 112.5 && value.properties.wind_direction_bearing <157.5){
            windDirection ="↘";
        }else if(value.properties.wind_direction_bearing >= 157.5 && value.properties.wind_direction_bearing <202.5){
            windDirection ="↓";
        }else if(value.properties.wind_direction_bearing >= 202.5 && value.properties.wind_direction_bearing <247.5){
            windDirection ="↙";
        }else if(value.properties.wind_direction_bearing >= 247.5 && value.properties.wind_direction_bearing <292.5){
            windDirection ="←";
        }else if(value.properties.wind_direction_bearing >= 292.5 && value.properties.wind_direction_bearing <337.5){
            windDirection ="↖";
        }
    }

    function camera(value){
        if(value.properties.camera_image != null){
            $("#table").append("<tr><td>"+value.properties.site_name +"</td><td>"+(Math.round(value.properties.air_temperature *10)/10) +"</td><td>"+
            (Math.round(value.properties.road_surface_temperature *10)/10) +"</td><td>"+(Math.round(value.properties.wind_speed * 10)/10)+"</td><td>"+
            windDirection +"</td><td><a href='"+value.properties.camera_image +
            "'><img  width='30' src='icons/camera.png'></a></td></tr>");
        }else{
            $("#table").append("<tr><td>"+value.properties.site_name +"</td><td>"+(Math.round(value.properties.air_temperature *10)/10) +"</td><td>"+
            (Math.round(value.properties.road_surface_temperature *10)/10) +"</td><td>"+(Math.round(value.properties.wind_speed * 10)/10)+"</td><td>"+
            windDirection +"</td><td>No Image</td></tr>");
        }
    }
});
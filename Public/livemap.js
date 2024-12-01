$("document").ready(function(){

    var iconSymbol;
    var map = L.map('map').setView([53.2734,-7.77832031], 6);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    $.getJSON("https://tiitrafficdata.azurewebsites.net/api/Weather",function(data){
        $.getJSON("/sites",function(sitedata){
            $.each(data.features,function(i, value){
                $.each(sitedata,function(j, sitevalue){

                    if(value.properties.site_name == sitevalue.site_name){

                        iconSymbol = L.icon({iconUrl: "icons/"+ value.properties.weather_description+".svg",iconSize:[32,32],iconAnchor:[16,16]});
                        var marker = L.marker([sitevalue.lat, sitevalue.lng],{icon: iconSymbol}).addTo(map);

                        if(value.properties.camera_image != null){
                            marker.bindPopup("<b>Name "+value.properties.site_name +"<br>"+value.properties.weather_definition + 
                            "<br> "+(Math.round(value.properties.air_temperature *10)/10) +"°C<br>"+
                            (Math.round(value.properties.wind_speed *10)/10)+" km/h <br> <a href='"+value.properties.camera_image +
                            "' target='framename'><img width='30' src='icons/camera.png'></a></b>");
                        }else{
                            marker.bindPopup("<b>Name "+value.properties.site_name +"<br>"+value.properties.weather_definition + 
                            "<br> "+(Math.round(value.properties.air_temperature *10)/10) +"°C<br>"+
                            (Math.round(value.properties.wind_speed *10)/10)+" km/h</b>");
                        } 
                    }                    
                });                                
            });
        });        
    });
});
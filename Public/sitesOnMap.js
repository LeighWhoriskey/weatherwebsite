$("document").ready(function(){

    var url = window.location.href;
    var params = new URLSearchParams(url);
    var siteName = params.get("sitename");
   
    $("#name").append("<p>" + siteName + " on Map");


    var map = L.map('map').setView([53.2734,-7.77832031], 6);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    $.ajax({
        url: "/sitesOnMap",
        cache: false,
        dataType: "json",
        type: "POST",
        data: {
            name: siteName
        },
        success: function(res){
            $.each(res,function(i, value){
                var marker = L.marker([value.lat, value.lng]).addTo(map);
                marker.bindPopup("<b>Name "+value.site_name +"<br> Lat "+ value.lat +" Long "+ value.lng +"</b>");
            });
        }
    });
});
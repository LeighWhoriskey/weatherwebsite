$("document").ready(function(){

    var map = L.map('map').setView([53.2734,-7.77832031], 6);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);


    $.getJSON("/sites",function(data){

        $.each(data,function(i,value){
            var marker = L.marker([value.lat, value.lng]).addTo(map);
            marker.bindPopup("<b>Name "+value.site_name +"<br>["+ value.lat +", "+ value.lng +"]</b>");
        });
    });

});
$("document").ready(function(){
    $.getJSON("/sites",function(data){
        $.each(data,function(i, value){
            $("#table").append("<tr><td>"+value.site_name +"</td><td><a href='sitesOnMap.html?&sitename="+value.site_name+"'>Map..</a></td></tr>");
        });
    });
});
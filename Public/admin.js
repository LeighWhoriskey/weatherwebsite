$("document").ready(function(){

    $.getJSON("/sites",function(data){
        $.each(data,function(i, value){
            $("#table").append("<tr><td>"+ value.site_name +"</td><td><button type='button' id='button"+
            i+"'>Edit...</button></td></tr>");

            $("#button"+i).on("click",function(){
                window.location.replace("/editSite.html?&sitename="+ value.site_name);
            });
        })
    })
});
$("document").ready(function(){
    var url = window.location.href;
    var params = new URLSearchParams(url);
    var siteName = params.get("sitename");
    
    $("#site").attr("value",siteName);


    $("#cancel").on("click",function(){
        window.location.replace("/admin.html");
    });


    $("#save").on("click",function(){
        $.ajax({
            url: "/updateSite",
            cache: false,
            dataType: "json",
            type: "POST",
            data: {
                name: siteName,
                newName: $("#site").val()
            },
            success: function(res){
                window.location.replace("/admin.html");
            }
        });
    });
});


$("document").ready(function(){
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth();

    if(day <10){ var formattedDay = String(0)+currentDate.getDate()}else{var formattedDay = currentDate.getDate()}
    if(month <10){ var formattedMonth =  String(0) + (parseInt(currentDate.getMonth())+parseInt(1));}else{var formattedMonth = (parseInt(currentDate.getMonth())+parseInt(1))}
    var formattedDate = currentDate.getFullYear() +"-" + formattedMonth +"-"+ formattedDay;
    $("#date").append("<h1>"+currentDate.toLocaleDateString() +"</h1>");
    $("#buttons").append("<button type='button' id='back'><<</button><button type='button' id='forward'>>></button>");

    $.ajax({
        url: "/weatherData",
        cache: false,
        dataType: "json",
        type: "POST",
        data: {
            date: formattedDate
        },
        success: function(res){
            $("#table").empty();
            if(Object.keys(res).length === 0){
                $("#table").append("<div><p >No Data Found On this Date</p></div>");
            }else{
                $.each(res,function(i,value){
                    $("#table").append("<tr><td>"+currentDate.toLocaleDateString()+
                    "</td><td><a href='siteDetail.html?&Site="+value.site_name+
                    "&Date="+formattedDate+"'>"+value.site_name+"</a></td><td>"+(Math.round(value.avg_air_temp *10)/10)+
                    "</td><td>"+(Math.round(value.avg_road_temp *10)/10)+"</td><td>"+
                    (Math.round(value.avg_wind_speed *10)/10)+"</td></tr>");
                });
            }   
        }
    });

    $("#back").on("click",function(){
        if(day <2){
            
            month = currentDate.getMonth();
            currentDate.setDate(day - 1);
            day = currentDate.getDate();

        }else{
            currentDate.setDate(day - 1);
            day = day - 1;

        }

        if(day <10){ var formattedDay = 0+currentDate.getDate()}else{var formattedDay = currentDate.getDate()}
        if(month <10){ var formattedMonth =  String(0) + (parseInt(currentDate.getMonth())+parseInt(1));}else{var formattedMonth = (parseInt(currentDate.getMonth())+parseInt(1))}
        formattedDate = currentDate.getFullYear() +"-" + formattedMonth +"-"+ formattedDay;

        $("#date").empty();
        $("#date").append("<h1>"+currentDate.toLocaleDateString() +"</h1>");

        $.ajax({
            url: "/weatherData",
            cache: false,
            dataType: "json",
            type: "POST",
            data: {
                date: formattedDate
            },
            success: function(res){
                $("#table").empty();
                if(Object.keys(res).length === 0){
                    $("#table").append("<div><p >No Data Found On this Date</p></div>");
                }else{
                    $.each(res,function(i,value){
                        $("#table").append("<tr><td>"+currentDate.toLocaleDateString()+
                        "</td><td><a href='siteDetail.html?&Site="+value.site_name+
                        "&Date="+formattedDate+"'>"+value.site_name+"</a></td><td>"+(Math.round(value.avg_air_temp *10)/10)+
                        "</td><td>"+(Math.round(value.avg_road_temp *10)/10)+"</td><td>"+
                        (Math.round(value.avg_wind_speed *10)/10)+"</td></tr>");
                    });
                }
            }
        });
        
    });


    $("#forward").on("click",function(){
        if(month != currentDate.getMonth()){
            day = currentDate.getDate();
        }
        currentDate.setDate(day + 1);
        day = day + 1;
        var month = currentDate.getMonth();

        $("#date").empty();
        $("#date").append("<h1>"+currentDate.toLocaleDateString() +"</h1>");

        if(day <10){ var formattedDay = 0+currentDate.getDate()}else{var formattedDay = currentDate.getDate()}
        if(month <10){ var formattedMonth =  String(0) + (parseInt(currentDate.getMonth())+parseInt(1));}else{var formattedMonth = (parseInt(currentDate.getMonth())+parseInt(1))}
        formattedDate = currentDate.getFullYear() +"-" + formattedMonth +"-"+ formattedDay;

        $.ajax({
            url: "/weatherData",
            cache: false,
            dataType: "json",
            type: "POST",
            data: {
                date: formattedDate
            },
            success: function(res){
                $("#table").empty();
                if(Object.keys(res).length === 0){
                    $("#table").append("<div><p >No Data Found On this Date</p></div>");
                }else{
                    $.each(res,function(i,value){
                        $("#table").append("<tr><td>"+currentDate.toLocaleDateString()+
                        "</td><td><a href='siteDetail.html?&Site="+value.site_name+
                        "&Date="+formattedDate+"'>"+value.site_name+"</a></td><td>"+(Math.round(value.avg_air_temp *10)/10)+
                        "</td><td>"+(Math.round(value.avg_road_temp *10)/10)+"</td><td>"+
                        (Math.round(value.avg_wind_speed *10)/10)+"</td></tr>");
                    });
                }
            }
        });

    });
});
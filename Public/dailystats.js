$("document").ready(function(){
    $.getJSON("/sites",function(data){
        $.each(data,function(i, value){
            $("#siteSelect").append("<option id='"+value.site_name +"'>"+value.site_name+"</option>");
        });
    });

    $("#getData").on("click",function(){
        if($("#siteSelect").val() != "Choose a site..." && $("#date").val() != "")
        {
            $("#error").empty();
            $.ajax({
                url: "/DailyStats",
                cache: false,
                dataType: "json",
                type: "POST",
                data: {
                    name: $("#siteSelect").val(),
                    date: $("#date").val()
                },
                success: function(res){
                    
                    if(Object.keys(res).length === 0){
                        $("#error").append("<p style='color:red'>No Data found on this Date");
                        $("#tableDiv").empty();
                        $("#ColumnColumnGraphDiv").empty();
                        $("#LineGraphDiv").empty();
                    }else{
                        

                        $("#error").empty();
                        $("#tableDiv").empty();
                        $("#ColumnGraphDiv").empty();
                        $("#LineGraphDiv").empty();

                        $("#tableDiv").append("<table border='1'><th>Time</th><th>Air Temperature °C</th><th>Road Temperature °C</th>"+
                        "<th>Wind Speed km/h</th><tbody id='table'></tbody></table>");
                    
                        $.each(res,function(i,value){
                            $("#table").append("<tr><td>"+value.timenow+"</td><td>"+(Math.round(value.air_temperature *10)/10) +
                            "</td><td>"+(Math.round(value.road_surface_temperature *10)/10) +"</td><td>" + 
                            (Math.round(value.wind_speed *10)/10)+"</td></tr>");
                        });

                        $("#tableDiv").append("<hr>");
                        $("#ColumnGraphDiv").append("<h1>Wind Speed Column Chart</h1>");

                        var Height = res.map(function(d){return (Math.round(d.wind_speed *10)/10)});

                        var ColumnSvg = d3.select("#ColumnGraphDiv")
                        .append("svg")
                        .attr("width",700)
                        .attr("height",550);

                        var y = d3.scaleLinear().domain([0,Math.max(...Height)]).range([ColumnSvg.attr("height"),0]);
                        var yAxis = d3.axisLeft(y);

                        var x = d3.scaleLinear().domain([0,ColumnSvg.attr("width")]).range([ ColumnSvg.attr("height"),500]);
                        var xAxis = d3.axisTop(x);
                 

                        var spacing=2;
                        var barWidth = ((ColumnSvg.attr("width")-50) - (res.length - 1) * spacing) / res.length;

                        var scale = d3.scaleLinear().domain([0,Math.max(...Height)]).range([0,ColumnSvg.attr("height")]);

                        var scaleWidth = d3.scaleLinear().domain([0,ColumnSvg.attr("width")-50]).range([0,ColumnSvg.attr("width")-50]);
                        var elements = ColumnSvg.append("g").attr("transform","translate(50,0)").call(yAxis).selectAll("rect").data(Height);  
                                             
                        //barchart
                        elements.enter().append("rect").attr('x',function(d,i) { return scaleWidth((barWidth+spacing)*i);})
                        .attr('y',function(d,i) { return parseFloat(ColumnSvg.attr("height"))-scale(d);})
                        .attr('width',scaleWidth(barWidth -spacing)).attr('height',function(d){ return scale(d);})
                        .attr('fill','steelblue').attr("stroke","black");

                        elements.enter().append("text").attr('x',function(d,i) { return scaleWidth( 20+((barWidth+spacing )*i));})
                        .attr('y',function(d,i) { return parseFloat(ColumnSvg.attr("height"))-10;}).attr('width',barWidth)
                        .text(function(d){ return d;}).attr('fill','black');

                        //line chart
                        $("#LineGraphDiv").append("<hr><h1>Wind Speed Line Chart</h1>");

                        var LineSvg = d3.select("#LineGraphDiv").append("svg")
                        .attr("width",700)
                        .attr("height",550);

                        var line = d3.line().x(function(d, i){return  i * barWidth})
	                    .y(function(d){return ColumnSvg.attr("height") - scale(d)})

                        LineSvg.append("g").attr("transform","translate(50,0)").call(xAxis).append("path")
                        .attr("d", line(Height))
                        .attr("stroke", "black")
                        .attr("fill", "none");


                        
                        var lineElements = LineSvg.append("g").attr("transform","translate(50,0)").call(yAxis).selectAll("Circle").data(Height);
                        
                        

                        lineElements.enter().append("circle").attr("cx",function(d,i){return barWidth * i})
                        .attr("cy",function(d){return ColumnSvg.attr("height") - scale(d)})
                        .attr("r",3).attr("fill","steelblue").attr("stroke","black");

                    }                    
                }
            });
        }else{
            $("#error").empty();
            $("#error").append("<p style='color:red'>Please Choose a Site And a Date");
        }
        
    });
});
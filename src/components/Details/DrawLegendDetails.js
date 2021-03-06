import * as d3 from 'd3';

function DrawLegend(containerId, minVal, maxVal, startColor, endColor){

    // calculate the size of div
    let legendDiv = document.getElementById(containerId),
        heightNum = legendDiv.clientHeight,
        widthNum = legendDiv.clientWidth;

    // create svg
    const svg = d3.select("#" + containerId)
                  .append("svg")
                  .attr("width", "100%")
                  .attr("height", "70%")
                  .attr("viewBox", "0 0 " +  0.5 * widthNum + " " + 0.5 * heightNum)
                  .style("display", "block");

    // create gradient
    const defs = svg.append("g")
       .append("defs")
       .append("linearGradient")
       .attr("id","legendGradient")
       .attr("x1","0%")
       .attr("x2","0%")
       .attr("y1","100%")
       .attr("y2","0%");

    // create color for start and end
    defs.append("stop")
    .attr('class', 'start')
    .attr("offset", "0%")
    .attr("stop-color", startColor)
    .attr("stop-opacity", 1);
    
    defs.append("stop")
       .attr('class', 'end')
       .attr("offset", "100%")
       .attr("stop-color", endColor)
       .attr("stop-opacity", 1);
    
    // draw legend 
    svg.append("rect")
        .attr("fill","url(#legendGradient)")
        .attr("x","50%")
        .attr("y","33%")
        .attr("width","20%")
        .attr("height","33%")
        .attr("rx",2)  //rounded corners, of course!
        .attr("ry",2);

    // add start text
    svg.append("text")
        .attr("class","legend-text")
        .attr("text-anchor", "middle")
        .attr("x","30%")
        .attr("y","66%")
        .attr("dy",0)
        .text(minVal);
    
    // add end text
    svg.append("text")
    .attr("class","legend-text")
    .attr("text-anchor", "middle")
    .attr("x","20%")
    .attr("y","34%")
    .attr("dy",0)
    .text(maxVal);

    // add end text
    svg.append("text")
    .attr("class","legend-text")
    .attr("text-anchor", "center")
    .attr("x","0%")
    .attr("y","31%")
    .attr("dy",0)
    .style("font-size","0.3vw")
    .text("Number of messages");
};

export {DrawLegend};
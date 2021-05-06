import * as d3 from 'd3';

function splitToChunksLegend(array, parts) {
    let result = [];
    let indicator = 0;
    let remainedLength = array.length;

    for (let i = parts; i > 0; i--) {
        let chunk = array.slice(indicator, indicator + Math.ceil(remainedLength / i));
        indicator = indicator + Math.ceil(remainedLength / i);
        remainedLength = remainedLength - chunk.length;
        let sum = chunk.reduce((a, b) => a+b , 0);
        result.push(sum);

    }
    
    
    return result;
}

function DrawLegend(containerId, beginRange, endRange, beginColor = "#00b300", middleColor = "#ffffff", endColor = "#b30000", svgWidth = '100%',
    svgHeight = '50%', barWidth = '10%', barHeight = '40%', x1 = '0%', y1 = '50%', needMiddleColor = true, fontSize = '0.6vw', legendTitle = "") {
    var svgWidthInner = svgWidth,
        svgHeightInner = svgHeight,
        barWidthInner = barWidth,
        barHeightInner = barHeight,
        x1Inner = x1,
        y1Inner = y1,
        startColorInner = beginColor,
        middleColorInner = middleColor,
        endColorInner = endColor;

    let legendDiv = document.getElementById(containerId);
    let height_num = legendDiv.clientHeight;
    let width_num = legendDiv.clientWidth;

    // cleaning the div
    document.getElementById(containerId).innerHTML = "";

    //.attr("viewBox", `0 0 ${width_num} ${height_num}`)
    var svg = d3.select('#' + containerId).append("svg")
        .attr("id", "legend")
        .attr("viewBox", `0 0 ${0.01*parseInt(svgWidthInner)*width_num} ${0.01*parseInt(svgHeightInner)*height_num}`);

    //Append a defs (for definition) element to your SVG
    var defs = svg.append("defs");

    //Append a linearGradient element to the defs and give it a unique id
    var linearGradient = defs.append("linearGradient")
        .attr("id", "linear-gradient");

    //Vertical gradient
    linearGradient
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "0%")
        .attr("y2", "100%");

    if (needMiddleColor) {
        //Set the color for the start (0%)
        linearGradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", startColorInner);

        //Set the color for the start (50%)
        linearGradient.append("stop")
            .attr("offset", "50%")
            .attr("stop-color", middleColorInner);

        //Set the color for the end (100%)
        linearGradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", endColorInner);
    } else {
        //Set the color for the start (100%)
        linearGradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", endColorInner);

        //Set the color for the start (0%)
        linearGradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", startColorInner);
    };



    //Draw the rectangle and fill with gradient
    svg.append("rect")
        .attr("width", barWidthInner)
        .attr("height", barHeightInner)
        .attr("x", x1Inner)
        .attr("y", y1Inner)
        .attr('rx', '5%')
        .style("fill", "url(#linear-gradient)");

    //add text on either side of the bar
    // from hifriz - v0.20
    y1 = 50;
    x1 = 24;
    svg.append("text")
        .attr("font-size", fontSize)
        .attr("font-family", "Oswald")
        .attr("class", "legendText")
        .attr("text-anchor", "left")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("x", 1.1 * barWidthInner.split('%')[0] + '%')
        .attr("y", (parseInt(y1Inner.split('%')[0]) + parseInt(barHeightInner.split('%')[0])) + '%')
        .attr("dy", 0)
        .text(beginRange + '%');

    svg.append("text")
        .attr("font-size", fontSize)
        .attr("font-family", "Oswald")
        .attr("class", "legendText")
        .attr("text-anchor", "left")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("x", 1.1 * barWidthInner.split('%')[0] + '%')
        .attr("y", (1.02) * parseInt(y1Inner.split('%')[0]) + '%')
        .attr("dy", 0)
        .text(endRange + '%');

    svg.append("text")
        .attr("font-size", fontSize)
        .attr("font-family", "Oswald")
        .attr("class", "legendText")
        .attr("text-anchor", "left")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("x", 0.3 * parseInt(barWidthInner.split('%')[0]) + '%')
        .attr("y", 0.9 * parseInt(y1Inner.split('%')[0]) + '%')
        .attr("dy", 0)
        .text(legendTitle);
};

export {DrawLegend, splitToChunksLegend};
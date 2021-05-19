import * as d3 from 'd3';

// general axis
let globalXAxis;


function drawLOB(container, date, name, volumeData, bidData, askData, cancelData, minMessageNum, maxMessageNum, isLastStock, allSvg, allLiqSvg, handleLobSvg, handleLiqSvg){

    // extract symbol
    let symbol = name.split('--')[1];

    let tempName = container.split("-")[1]; // in production, Use name instead of tempName

    // time parser
    let timeParser = d3.timeParse("%H:%M:%S.%L");

    // extract the size of the division
    let division = document.getElementById(container);
    const height_num = division.clientHeight,
        width_num = division.clientWidth,
        xScale = 0.95,
        yScale = 0.65,
        startPoint = 0.09,
        messageNumStartColor = "#ffe680",
        messageNumEndColor = "#ff3300",
        lastStockScale = isLastStock ? 0.65 : 2;
    

    // fetch data
    let localBidData = bidData[symbol][date],
        localAskData = askData[symbol][date],
        localCancelData = cancelData[symbol][date],
        localVolumeData = volumeData[symbol][date];

    // define the rectangle(cells for viz) position and specs
    let offsetRectangles = 0.5,
        widthRectangle = width_num/localBidData["time"].length;
    
    
    // convert date format
    let newBidTime = localBidData["time"].map(timeParser),
        newAskTime = localAskData["time"].map(timeParser),
        newCancelTime = localCancelData["time"].map(timeParser),
        newVolumeTime = localVolumeData["time"].map(timeParser);
    
    localBidData["time"] = newBidTime;
    localAskData["time"] = newAskTime;
    localCancelData["time"] = newCancelTime;
    localVolumeData["time"] = newVolumeTime;


    // create group of data
    const groups = [{"Volume": localVolumeData}, {"Cancel": localCancelData}, {"Bid": localBidData}, {"Ask": localAskData}]

    // extract min and max of the features

    // time is the same for all groups
    const maxDate = d3.max(groups, group => {
        return d3.max(group[Object.keys(group)[0]]["time"])
    });
    const minDate = d3.min(groups, group => {
        return d3.min(group[Object.keys(group)[0]]["time"])
    });
    
    // draw the viz
    document.getElementById(container).innerHTML = "";
    let svg = d3.select('#' + container)
                .append('svg')
                .attr('id', tempName+'--svg')
                .attr('class', 'lob-svg')
                .attr("viewBox", `0 0 ${width_num} ${0.75 * height_num}`)
                .append("g");
    
    // set title
    svg.append("text")
        .attr("x", "50%")             
        .attr("y", "0%")
        .attr("text-anchor", "middle") 
        .style("margin-bottom", "1%")
        .style("font-size", "0.7vw")  
        .text(tempName);

    // define axis
    let globalXAxis = d3.scaleTime()
            .domain(d3.extent([minDate, maxDate]))
            .range([startPoint*width_num, xScale * width_num]);
    
    let y = d3.scaleBand()
            .range([yScale * height_num, 0])
            .domain(["Volume", "Cancel", "Bid", "Ask"]);

    // assemble axis
    let xAxis, yAxis;

    if(isLastStock){
        xAxis = svg.append("g")
                .attr("id", "xaxis")
                .attr("class", "axis")
                .attr("transform", "translate(0," + lastStockScale * height_num + ")")
                .call(d3.axisBottom(globalXAxis).ticks(5))
                .select(".domain")
                .attr("display", "none");
    }

    yAxis = svg.append("g")
            .attr("id", "yaxis")
            .attr("class", "axis")
            .attr("transform", "translate("+ startPoint * width_num +",0)")
            .call(d3.axisLeft(y))
            .select(".domain")
            .attr("display", "none");

    // create colormap for message numbers
    const colorMapMessages = d3.scaleLinear().domain([minMessageNum, maxMessageNum])
    .range([messageNumStartColor, messageNumEndColor]);


    // create bars
    const bars = svg.selectAll(".lob-row-g")
                    .data(groups)
                    .enter()
                    .append("g")
                    .attr("class", "lob-row-g");
    
    bars.selectAll(".lob-row-cell")
                        .data(d => {
                            let out = [],
                            times = d[Object.keys(d)[0]]["time"];

                            times.forEach(element => {
                                let fillValIndex = times.indexOf(element);
                                out.push({
                                    id: tempName+Object.keys(d)[0]+fillValIndex, //in production, Use name instead of tempName
                                    index: fillValIndex,
                                    section:Object.keys(d)[0], 
                                    time: element, 
                                    fillVal: d[Object.keys(d)[0]]["messageNum"][fillValIndex],
                                    value: d[Object.keys(d)[0]]["value"][fillValIndex].toFixed(2),
                                    average: d3.sum(d[Object.keys(d)[0]]["value"])/d[Object.keys(d)[0]]["value"].length ,
                                    maxVal: d3.max(d[Object.keys(d)[0]]["value"])
                                });
                            });

                            return out;
                        })
                        .enter()
                        .append("rect")
                        .attr("class", "lob-row-cell")
                        .attr("width", widthRectangle)
                        .attr("height", 1.2 * yScale * y.bandwidth())
                        .attr("transform", d => {
                            let xPos = globalXAxis(d.time) + offsetRectangles,
                                yPos = y(d.section);

                            return "translate(" + xPos + "," + yPos + ")"
                        })
                        .style("fill", d => {
                            return colorMapMessages(d.fillVal);
                        })
                        .on("mouseover", (event, mainData) => {

                            // show time
                            let showTime = (Object.keys(allSvg).indexOf(tempName) + 1) === Object.keys(allSvg).length ? true : false ,
                                showTimeValue = mainData.time;

                            // first element
                            let isFirst = tempName === "Market_SPY" ? true : false ,
                                hoverPack = {
                                    mainData: mainData,
                                    svg: svg,
                                    y: y,
                                    showTime: showTime,
                                    isFirst: isFirst,
                                    hasText: true,
                                    showTimeValue: showTimeValue
                                };


                            updateHoverZoom(event, globalXAxis, y, allSvg, xAxis, yAxis, 
                                offsetRectangles, lastStockScale, height_num, width_num, 
                                colorMapMessages, xScale, startPoint, true, hoverPack);
                            // drawHover(mainData, svg, globalXAxis, y, showTime, isFirst, true, showTimeValue);

                            // lob SVGs
                            for (let otherSvg in allSvg){
                                // show time
                                let showTime = (Object.keys(allSvg).indexOf(otherSvg) + 1) === Object.keys(allSvg).length ? true : false ;
                                // first element
                                let isFirst = otherSvg === "Market_SPY" ? true : false ;

                                if (otherSvg !== tempName){
                                    allSvg[otherSvg].selectAll(".lob-row-cell")
                                                    .filter((d) => {
                                                            return d.index === mainData.index;
                                                    })
                                                    .each((d) => {
                                                        if(d.time - mainData.time === 0){
                                                            hoverPack = {
                                                                mainData: d,
                                                                svg: allSvg[otherSvg],
                                                                y: y,
                                                                showTime: showTime,
                                                                isFirst: isFirst,
                                                                hasText: true,
                                                                showTimeValue: showTimeValue
                                                            };
                                                            updateHoverZoom(event, globalXAxis, y, allSvg, xAxis, yAxis, 
                                                                offsetRectangles, lastStockScale, height_num, width_num, 
                                                                colorMapMessages, xScale, startPoint, true, hoverPack);
                                                            // drawHover(d, allSvg[otherSvg], globalXAxis, y, showTime, isFirst, true, showTimeValue);
                                                        }else{
                                                            hoverPack = {
                                                                mainData: d,
                                                                svg: allSvg[otherSvg],
                                                                y: y,
                                                                showTime: showTime,
                                                                isFirst: isFirst,
                                                                hasText: false,
                                                                showTimeValue: showTimeValue
                                                            };
                                                            updateHoverZoom(event, globalXAxis, y, allSvg, xAxis, yAxis, 
                                                                offsetRectangles, lastStockScale, height_num, width_num, 
                                                                colorMapMessages, xScale, startPoint, true, hoverPack);
                                                            // drawHover(d, allSvg[otherSvg], globalXAxis, y, showTime, isFirst, false, showTimeValue);
                                                        }
                                                        
                                                    })
                                } else{
                                    allSvg[otherSvg].selectAll(".lob-row-cell")
                                                    .filter((d) => {
                                                            return (d.section !== mainData.section) && (d.index === mainData.index);
                                                    })
                                                    .each((d) => {
                                                        if(d.time - mainData.time === 0){
                                                            hoverPack = {
                                                                mainData: d,
                                                                svg: allSvg[otherSvg],
                                                                y: y,
                                                                showTime: showTime,
                                                                isFirst: isFirst,
                                                                hasText: true,
                                                                showTimeValue: showTimeValue
                                                            };
                                                            updateHoverZoom(event, globalXAxis, y, allSvg, xAxis, yAxis, 
                                                                offsetRectangles, lastStockScale, height_num, width_num, 
                                                                colorMapMessages, xScale, startPoint, true, hoverPack);
                                                            // drawHover(d, allSvg[otherSvg], globalXAxis, y, showTime, isFirst, true, showTimeValue);
                                                        }else{
                                                            hoverPack = {
                                                                mainData: d,
                                                                svg: allSvg[otherSvg],
                                                                y: y,
                                                                showTime: showTime,
                                                                isFirst: isFirst,
                                                                hasText: false,
                                                                showTimeValue: showTimeValue
                                                            };
                                                            updateHoverZoom(event, globalXAxis, y, allSvg, xAxis, yAxis, 
                                                                offsetRectangles, lastStockScale, height_num, width_num, 
                                                                colorMapMessages, xScale, startPoint, true, hoverPack);
                                                            // drawHover(d, allSvg[otherSvg], globalXAxis, y, showTime, isFirst, false, showTimeValue);
                                                        }
                                                    })
                                };
                            };

                            // liquidity SVGs
                            for (let otherLiqSvg in allLiqSvg){
                                // show time
                                let showTime = (Object.keys(allLiqSvg).indexOf(otherLiqSvg) + 1) === Object.keys(allLiqSvg).length ? true : false ;
                                // first element
                                let isFirst = otherLiqSvg === "Market_SPY" ? true : false ;

                                // draw general line
                                let adjustLine = isFirst? "0%":"-50%";


                                allLiqSvg[otherLiqSvg].selectAll(".liqRow")
                                    .each((d) => {
                                        d.forEach(datum => {
                                            if(datum.time - mainData.time === 0){
                                                drawLiqHover(datum, allLiqSvg[otherLiqSvg], showTime, isFirst, isLastStock, true, mainData.time);
                                            }else{
                                                drawLiqHover(datum, allLiqSvg[otherLiqSvg], showTime, isFirst, isLastStock, false, mainData.time);
                                            }
                                        });
                                    });
                            };





                        })
                        .on("mouseout", (event,d) => {
                            d3.selectAll(".hoverlabel").remove();
                        });



    // extracting four path for values

    let line = d3.line(),
        paths = {"Volume":[], "Cancel":[], "Bid":[], "Ask":[]},
        pathData = [(paths["Volume"]), (paths["Cancel"]), (paths["Bid"]), (paths["Ask"])];


    groups.forEach(element => {
        let key = Object.keys(element)[0];
        let values = element[key]["value"];

        if (key === "Volume"){
             values = element[key]["value"].map(Math.abs);     
        };

        let average = d3.sum(values) / values.length;
        let maxVal = d3.max(values.map(Math.abs));

        values.forEach(value => {
            let index = values.indexOf(value);
            let time = element[key]["time"][index];

            let xPos = 1+globalXAxis(time);
            let yPos = 7 + y(key) - (y.bandwidth()/(4 * (maxVal - average))) * (value - average);

            paths[key].push([xPos, yPos]);

        });
    });

    bars.selectAll(".lob-row-g")
        .data(pathData)
        .enter()
        .append("path")
        .attr("class", "lob-line")
        .attr("d", d => {return line(d)});



    // zooming

    let zoom = d3.zoom()
    .scaleExtent([1, 40])  // This control how much you can unzoom (x1) and zoom (x40)
    .extent([[startPoint*width_num, 0], [xScale * width_num, yScale * height_num]])
    .translateExtent([[startPoint*width_num, 0], [xScale * width_num, yScale * height_num]])
    .on("zoom", (event) => {
        updateHoverZoom(event, globalXAxis, y, allSvg, xAxis, yAxis, 
                   offsetRectangles, lastStockScale, height_num, width_num, 
                   colorMapMessages, xScale, startPoint);

        updateLiqZoom(event, globalXAxis, allLiqSvg);
    });

    svg.append("rect")
        .attr("id","zoomPlane")
        .attr("width", xScale * width_num - startPoint*width_num)
        .attr("height", yScale * height_num)
        .style("fill", "none")
        .style("pointer-events", "all")
        .attr("transform", "translate(" + startPoint*width_num + "," + 0 + ")")
        .lower();


    svg.call(zoom);



    
    // store svg beside all svgs
    handleLobSvg(tempName, svg);
};

// put flag for controlling zoom
let isStart = true,
    modalX;

// update zoom
function updateHoverZoom(event, x, y, allSvg, xAxis, yAxis, offsetRectangles, 
                    lastStockScale, height_num, width_num, colorMapMessages, 
                    xScale, startPoint, isHover = false, hoverPack = {
                        mainData: "",
                        svg: "",
                        y: "",
                        showTime: "",
                        isFirst: "",
                        hasText: "",
                        showTimeValue: ""
                    }){

            if(isStart){
                modalX = x;
            }

            if (!isHover){

                // recover the new scale
                let newX = event.transform.rescaleX(x);
                isStart = false;

                modalX = newX;

                // var newY = event.transform.rescaleY(y);
                for (let compName in allSvg){

                    let svg = allSvg[compName];

                    // draw new axis
                    let isLastStock = Object.keys(allSvg).length === 1+Object.keys(allSvg).indexOf(compName) ? true : false ;
                    lastStockScale = isLastStock ? 0.65 : 2;


                    if(isLastStock){

                        svg.select("#xaxis").remove();
                        xAxis = svg.append("g")
                                    .attr("id", "xaxis")
                                    .attr("class", "axis")
                                    .attr("transform", "translate(0," + lastStockScale * height_num + ")")
                                    .call(d3.axisBottom(newX).ticks(5))
                                    .select(".domain")
                                    .attr("display", "none");
                    };

                    // yAxis.call(d3.axisLeft(newY));
                    // just for level 1 and test
                    // let rectNum = 0.1 + Math.floor(100 * (newX.domain()[1] - newX.domain()[0]) / (x.domain()[1] - x.domain()[0])),
                    //     rectWidth = width_num / rectNum;

                    svg.selectAll(".lob-row-cell")
                        // .attr("width", rectWidth)
                        .attr("transform", d => {
                            let xPos = newX(d.time) + offsetRectangles,
                                yPos = y(d.section);

                            return "translate(" + xPos + "," + yPos + ")"
                        })
                        .style("fill", d => {
                            if (newX(d.time) > (xScale * width_num)  || newX(d.time) < (startPoint * width_num)){
                                return "none";
                            } else {
                                return colorMapMessages(d.fillVal);
                            }
                        })


                    // update line chart
                    svg.selectAll(".lob-line").remove();

                    svg.selectAll(".lob-row-g")
                    .append("path")
                    .attr("class", "lob-line")
                    .attr("d", d => {
                        
                        let key = Object.keys(d)[0],
                        localData = d[key];
                        let line = d3.line(),
                                path = [],
                                xPos,
                                yPos,
                                time,
                                maxVal = d3.max(localData.value),
                                average = d3.sum(localData.value) / localData.value.length;

                        localData.value.map((val, index) => {
                                time = localData.time[index];
                                xPos = 1+newX(time);
                                yPos = 7 + y(key) - (y.bandwidth()/(4 * (maxVal - average))) * (val - average);


                                if (!(xPos > (xScale * width_num)  || xPos < (startPoint * width_num))){
                                    path.push(
                                        [xPos, yPos]
                                    );
                                }
                        });


                        return line(path);
                        


                    } )

                    };
            };

            // if there is hover, the function will run
            if (isHover){
                let mainData = hoverPack.mainData,
                svg = hoverPack.svg,
                y = hoverPack.y,
                showTime = hoverPack.showTime,
                isFirst = hoverPack.isFirst,
                hasText = hoverPack.hasText,
                showTimeValue = hoverPack.showTimeValue;
                drawHover(mainData, svg, modalX, y, showTime, isFirst, hasText, showTimeValue);
            };

            // update hover
            function drawHover(mainData, svg, x, y, showTime, isFirst, hasText=false, showTimeValue){

                // adjust hover text from the edge of the viz
                let adjustScale = (mainData.index > 80) ? 0.8 : 1.04;
                // adjust hover line start point
                let adjustLine = isFirst ? "0%":"-20%";

                svg.append("line")
                .attr("x1", x(showTimeValue))
                .attr("y1", adjustLine)
                .attr("x2", x(showTimeValue))
                .attr("y2", "120%")
                .attr("class", "hoverlabel")
                .attr("stroke", "black")

                if(hasText){
                    // Specify where to put label of text
                    svg.append("text")
                    .attr("id", mainData.id+"1") // Create an id for text so we can select it later for removing on mouseout
                    .attr("class", "hoverlabel")
                    .attr("x", function() { return adjustScale * x(showTimeValue) })
                    .attr("y", function() { return y(mainData.section) })
                    .attr("dy", "0.4vw")
                    .style("font-size", "0.5vw")
                    .text(function() {
                        let text = mainData.section + " value:" + Math.abs(mainData.value);  // Value of the text
                        return text;
                        });
                    svg.append("text")
                    .attr("id", mainData.id+"2") // Create an id for text so we can select it later for removing on mouseout
                    .attr("class", "hoverlabel")
                    .attr("x", function() { return adjustScale * x(showTimeValue) })
                    .attr("y", function() { return y(mainData.section) })
                    .attr("dy", "0.9vw")
                    .style("font-size", "0.5vw")
                    .text(function() {
                        let text = "Number of messages: " + mainData.fillVal;  // Value of the text
                        return text;
                        });
                }



                if(showTime && mainData.section === "Volume"){
                    // format the time 
                    let format = d3.timeFormat("%H:%M:%S.%L"),
                    time = format(showTimeValue);


                    svg.append("text")
                    .attr("id", mainData.id+"time") // Create an id for text so we can select it later for removing on mouseout
                    .attr("class", "hoverlabel")
                    .attr("x", function() { return adjustScale * x(showTimeValue) })
                    .attr("y", "115%")
                    .style("font-size", "0.6vw")
                    .style("color", "red")
                    .text(function() {
                        let text = "" + time;  // Value of the text
                        return text;
                        });
                };
            };

};

// zoom on liquidity
function updateLiqZoom(event, xAxis, allLiqSvg){
        // find the number of stocks to put the xAxis in the position.
        let division = document.getElementById("metrics"),
        heightNum = division.clientHeight,
        widthNum = division.clientWidth,
        xPositionCoeff =  0.145;

        // recover the new scale
        let newX = event.transform.rescaleX(xAxis);

        // set the range of xAxis
        newX.range([0, widthNum]);

        // update all LiqSVG
        for (let compName in allLiqSvg){

            let svg = allLiqSvg[compName];

            // draw new axis
            let isLastStock = Object.keys(allLiqSvg).length === 1+Object.keys(allLiqSvg).indexOf(compName) ? true : false ;

            if(isLastStock){

                svg.select("#xaxis").remove();

                // assemble axis
                svg.append("g")
                .attr("id", "xaxis")
                .attr("class", "axis")
                .attr("transform", "translate("+ 0 +"," + xPositionCoeff * heightNum + ")")
                .call(d3.axisBottom(newX).ticks(5))
                .select(".domain")
                .attr("display", "none");
            }

            // update area chart
            let area = d3.area()
                            .x(d => {return newX(d.time);})
                            .y0(d => {return 0.5 * d.yAxis.bandwidth()})
                            .y1(d => {
                                return d.yValue;
                            });
            svg.selectAll(".liqPath").remove();

            svg.selectAll(".liqRow")
               .append("path")
               .datum(d =>{return d})
               .attr("class", "liqPath")
               .attr("stroke", "#e6e6e6")
               .attr("stroke-width", 0.5)
               .attr("d", d => {return area(d)})
               .style("fill", "url(#liqGradient)");


        }
};



// hover on liquidity
function drawLiqHover(d, svg, showTime, isFirst, isLastStock, hasText=false, showTimeValue){

    // adjust hover text from the edge of the viz
    let adjustLine = isFirst? "10%":"-50%",
        yOffset = 15;

    // adjust hover line start point

    svg.append("line")
    .attr("x1", d.xAxis(showTimeValue))
    .attr("y1", adjustLine)
    .attr("x2", d.xAxis(showTimeValue))
    .attr("y2", "150%")
    .attr("class", "hoverlabel")
    .attr("stroke", "black")

    if(hasText){
        // Specify where to put label of text
        svg.append("text")
        .attr("class", "hoverlabel") // Create an id for text so we can select it later for removing on mouseout
        .attr("x", d.xAxis(showTimeValue) + 5)
        .attr("y", yOffset + d.yAxis(d.type))
        .style("font-size", "0.8vw")
        .text(function(){
            return "Value: " + d.yValue.toPrecision(3);
        });
    }



    if(showTime && d.type === "Effective Spread" && d.index === 1 ){

        // format the time 
        let format = d3.timeFormat("%H:%M:%S.%L"),
        time = format(showTimeValue);


        svg.append("text")
        .attr("class", "hoverlabel")  // Create an id for text so we can select it later for removing on mouseout
        .attr("x", d.xAxis(showTimeValue) + 5)
        .attr("y", "100%")
        .style("font-size", "0.6vw")
        .text(function() {
            let text = "" + time;  // Value of the text
            return text;
            });
    };
};


export default drawLOB;
import * as d3 from 'd3';

function drawLOB(container, date, name, volumeData, bidData, askData, cancelData, minMessageNum, maxMessageNum, isLastStock, allSvg, handleLobSvg){

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
    let x = d3.scaleTime()
            .domain(d3.extent([minDate, maxDate]))
            .range([startPoint*width_num, xScale * width_num]);
    
    let y = d3.scaleBand()
            .range([yScale * height_num, 0])
            .domain(["Volume", "Cancel", "Bid", "Ask"]);

    // assemble axis
    if(isLastStock){
        svg.append("g")
        .attr("id", "xaxis")
        .attr("class", "axis")
        .attr("transform", "translate(0," + lastStockScale * height_num + ")")
        .call(d3.axisBottom(x).ticks(5))
        .select(".domain")
        .attr("display", "none");
    }

    svg.append("g")
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
                            let xPos = x(d.time) + offsetRectangles,
                                yPos = y(d.section);

                            return "translate(" + xPos + "," + yPos + ")"
                        })
                        .style("fill", d => {
                            return colorMapMessages(d.fillVal);
                        })
                        .on("mouseover", (event, mainData) => {

                            // show time
                            let showTime = (Object.keys(allSvg).indexOf(tempName) + 1) === Object.keys(allSvg).length ? true : false ;
                            // first element
                            let isFirst = tempName === "Market_SPY" ? true : false ;
                            drawHover(mainData, svg, x, y, showTime, isFirst);

                            for (let otherSvg in allSvg){
                                // show time
                                let showTime = (Object.keys(allSvg).indexOf(otherSvg) + 1) === Object.keys(allSvg).length ? true : false ;
                                // first element
                                let isFirst = otherSvg === "Market_SPY" ? true : false ;

                                if (otherSvg !== tempName){
                                    allSvg[otherSvg].selectAll("rect")
                                                    .filter((d) => {
                                                            return d.index === mainData.index;
                                                    })
                                                    .each((d) => {
                                                        drawHover(d, allSvg[otherSvg], x, y, showTime, isFirst);
                                                    })
                                } else{
                                    allSvg[otherSvg].selectAll("rect")
                                                    .filter((d) => {
                                                            return (d.section !== mainData.section) && (d.index === mainData.index);
                                                    })
                                                    .each((d) => {
                                                        drawHover(d, allSvg[otherSvg], x, y, showTime, isFirst);
                                                    })
                                };
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

            let xPos = 1+x(time);
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

    
    // store svg beside all svgs
    handleLobSvg(tempName, svg);
};


function drawHover(mainData, svg, x, y, showTime, isFirst){

        // adjust hover text from the edge of the viz
        let adjustScale = (mainData.index > 80) ? 0.8 : 1.04;
        // adjust hover line start point
        let adjustLine = isFirst ? "0%":"-20%";

        svg.append("line")
        .attr("x1", x(mainData.time))
        .attr("y1", adjustLine)
        .attr("x2", x(mainData.time))
        .attr("y2", "120%")
        .attr("class", "hoverlabel")
        .attr("stroke", "black")

        // Specify where to put label of text
        svg.append("text")
        .attr("id", mainData.id+"1") // Create an id for text so we can select it later for removing on mouseout
        .attr("class", "hoverlabel")
        .attr("x", function() { return adjustScale * x(mainData.time) })
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
        .attr("x", function() { return adjustScale * x(mainData.time) })
        .attr("y", function() { return y(mainData.section) })
        .attr("dy", "0.9vw")
        .style("font-size", "0.5vw")
        .text(function() {
            let text = "Number of messages: " + mainData.fillVal;  // Value of the text
            return text;
            });
            
        if(showTime && (mainData.section === "Volume")){
            // format the time 
            let format = d3.timeFormat("%H:%M:%S.%L"),
            time = format(mainData.time);


            svg.append("text")
            .attr("id", mainData.id+"time") // Create an id for text so we can select it later for removing on mouseout
            .attr("class", "hoverlabel")
            .attr("x", function() { return adjustScale * x(mainData.time) })
            .attr("y", "115%")
            .style("font-size", "0.6vw")
            .style("color", "red")
            .text(function() {
                let text = "" + time;  // Value of the text
                return text;
                });
        };
};


export default drawLOB;
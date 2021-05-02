import * as d3 from 'd3';

function drawLOB(container, date, name, volumeData, bidData, askData, cancelData, minMessageNum, maxMessageNum){

    // extract symbol
    let symbol = name.split('--')[1];

    // time parser
    let timeParser = d3.timeParse("%H:%M:%S.%L");

    // extract the size of the division
    let division = document.getElementById(container);
    const height_num = division.clientHeight,
        width_num = division.clientWidth,
        xScale = 0.95,
        yScale = 0.65,
        startPoint = 0.09,
        messageNumStartColor = "#e6ccff",
        messageNumEndColor = "#26004d";
    

    // fetch data
    let localBidData = bidData[symbol][date],
        localAskData = askData[symbol][date],
        localCancelData = cancelData[symbol][date],
        localVolumeData = volumeData[symbol][date];
    
    
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
    let svg = d3.select('#' + container)
                .append('svg')
                .attr('id', symbol+'--svg')
                .attr('class', 'lob-svg')
                .attr("viewBox", `0 0 ${width_num} ${0.75 * height_num}`)
                .append("g")
                .attr('class', 'lob-svg');
    
    // set title
    let tempName = container.split("-")[1]; // in production, Use name instead of tempName
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
    svg.append("g")
    .attr("id", "xaxis")
    .attr("class", "axis")
    .attr("transform", "translate(0," + yScale * height_num + ")")
    .call(d3.axisBottom(x).ticks(5));

    svg.append("g")
    .attr("id", "yaxis")
    .attr("class", "axis")
    .attr("transform", "translate("+ startPoint * width_num +",0)")
    .call(d3.axisLeft(y));

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
                                    section:Object.keys(d)[0], 
                                    time: element, 
                                    fillVal: d[Object.keys(d)[0]]["messageNum"][fillValIndex],
                                    value: d[Object.keys(d)[0]]["value"][fillValIndex],
                                    average: d3.sum(d[Object.keys(d)[0]]["value"])/d[Object.keys(d)[0]]["value"].length ,
                                    maxVal: d3.max(d[Object.keys(d)[0]]["value"])
                                });
                            });

                            return out;
                        })
                        .enter()
                        .append("rect")
                        .attr("class", "lob-row-cell")
                        .attr("width", 2)
                        .attr("height", 1.1 * yScale * y.bandwidth())
                        .attr("transform", d => {
                            let xPos = x(d.time),
                                yPos = y(d.section);

                            return "translate(" + xPos + "," + yPos + ")"
                        })
                        .style("fill", d => {
                            return colorMapMessages(d.fillVal);
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
            let yPos = 5 + y(key) + (y.bandwidth()/(4 * (maxVal - average))) * (value - average);

            paths[key].push([xPos, yPos]);

        });
    });

    bars.selectAll(".lob-row-g")
        .data(pathData)
        .enter()
        .append("path")
        .attr("class", "lob-line")
        .attr("d", d => {return line(d)});
};

export default drawLOB;
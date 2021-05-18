import * as d3 from 'd3';


function drawLiq(container, name, date, data, zoomLevel, divTitle, allSvg, allLiqSvg, handleLiqSvg, isLastStock, liqNames){
    let names = name.split("//"); // in production, Use name instead of liqName
    let symbol = names[0].split('--')[1]; // extract symbol
    let realCompName = names[1];


    // extract the size of the division
    let division = document.getElementById("metrics");
    const heightNum = division.clientHeight,
        widthNum = division.clientWidth,
        yOffset = 10; // offset of yAxis

    // time parser
    let timeParser = d3.timeParse("%H:%M:%S.%L");

    // fetch data
    let localData = data[symbol][date];

    // convert date format
    let newTime = localData["time"].map(timeParser);
    localData["time"] = newTime;

    // time is the same for all groups
    const maxDate = d3.max(localData["time"]);
    const minDate = d3.min(localData["time"]);

    // draw the viz
    document.getElementById(container).innerHTML = "";
    let svg = d3.select('#' + container)
    .append('svg')
    .attr('id', symbol+'--svg')
    .attr('class', 'liq-svg')
    .attr("viewBox", `0 0 ${widthNum} ${0.185*heightNum}`)
    .append("g");

    // define axis
    let x = d3.scaleTime()
            .domain(d3.extent([minDate, maxDate]))
            .range([0, widthNum]);
    let y = d3.scaleBand()
            .range([0.163*heightNum, yOffset])
            .domain(liqNames);


    // create gradient
    svg.append("g")
    .append("defs")
    .append("linearGradient")
    .attr("id","liqGradient")
    .attr("x1","0%")
    .attr("x2","0%")
    .attr("y1","100%")
    .attr("y2","0%")
    .selectAll("stop")
      .data([
        {offset: "0%", color: "#ff8080"},
        {offset: "50%", color: "#ff8080"},
        {offset: "50%", color: "#33cc33"},
        {offset: "100%", color: "#33cc33"}
      ])
    .enter().append("stop")
      .attr("offset", function(d) { return d.offset; })
      .attr("stop-color", function(d) { return d.color; });


    // create area charts
    let bandSize = y.bandwidth();

    // add circles  for hovering in the area chart
    let makeUpData = [];
    localData["time"].forEach(d => {
        makeUpData.push({time: d, x: x(d), xAxis: x, value: Math.random() * y.bandwidth(), index: localData["time"].indexOf(d)});
    });

    // add data to the element for hoveering, zooming
    let liqNamesAdded  = [],
        arr = [];

    for (let i = liqNames.length - 1; i>=0 ; i--){
        let element = liqNames[i];
        arr = [];

        localData["time"].forEach(d => {
          arr.push({type: element, time: d, xAxis: x, yAxis: y, yValue: Math.random() * y.bandwidth(), index: localData["time"].indexOf(d)});
        })

        liqNamesAdded.push(arr);

    };



    svg.selectAll(".liqRow")
      .data(liqNamesAdded)
      .enter()
      .append("svg")
      .attr("class", "liqRow")
      .attr("id", d => {return realCompName + "-" + d[0].type})
      .attr("y", d => {return (yOffset + ((2-liqNames.indexOf(d[0].type))) * bandSize)})
      .append("path")
        .datum(makeUpData)
        .attr("class", "liqPath")
        .attr("stroke", "#e6e6e6")
        .attr("stroke-width", 0.5)
        .attr("d", d3.area()
                    .x(d => {return x(d.time);})
                    .y0(0.5 * bandSize)
                    .y1(d => {
                        return d.value;
                    }))
        .style("fill", "url(#liqGradient)");


    if(isLastStock){
      // find the number of stocks to put the xAxis in the position.
      let xPositionCoeff =  0.145;
      // assemble axis
      svg.append("g")
      .attr("id", "xaxis")
      .attr("class", "axis")
      .attr("transform", "translate("+ 0 +"," + xPositionCoeff * heightNum + ")")
      .call(d3.axisBottom(x).ticks(5))
      .select(".domain")
      .attr("display", "none");
    }

    svg.append("g")
        .attr("id", "yaxis")
        .attr("class", "axis")
        .attr("transform", "translate(0,0)")
        .call(d3.axisLeft(y))
        .select(".domain")
        .attr("display", "none");
                            

    // hovering
    svg.on("mouseover", (event) => {
      console.log(d3.pointer(event), event, x.invert(d3.pointer(event)[0]));


      
    })

    // set title
    svg.append("text")
    .attr("x", "50%")             
    .attr("y", "5%")
    .attr("text-anchor", "middle") 
    .style("margin-bottom", "1%")
    .style("font-size", "0.7vw")  
    .text(realCompName);
   
      
  // add svg for tracking the records
  handleLiqSvg(divTitle.split("--")[1], svg);
};


function drawHover(mainData, svg, x, y, showTime, isFirst, hasText=false, showTimeValue){

  // adjust hover text from the edge of the viz
  let adjustScale = (mainData.index > 80) ? 0.8 : 1.04;
  // adjust hover line start point
  let adjustLine = isFirst ? "0%":"-50%";

  svg.append("line")
  .attr("x1", x(mainData.time))
  .attr("y1", adjustLine)
  .attr("x2", x(mainData.time))
  .attr("y2", "120%")
  .attr("class", "hoverlabel")
  .attr("stroke", "black")

  if(hasText){
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
  }



  if(showTime && mainData.section === "Volume"){
      // format the time 
      let format = d3.timeFormat("%H:%M:%S.%L"),
      time = format(showTimeValue);


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


export default drawLiq;
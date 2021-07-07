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
                            
    // set title
    svg.append("text")
        .attr("x", "50%")             
        .attr("y", "5%")
        .attr("text-anchor", "middle") 
        .style("margin-bottom", "1%")
        .style("font-size", "0.7vw")  
        .text(realCompName);
    
    // hovering

    // liq-lob hover
    svg.selectAll(".liqRow")
       .on("mouseover", (event, d) => {
            // receive the updated axis 
            let newX = d[0].xAxis,
                showTime = newX.invert(d3.pointer(event)[0]),
                liqType = d[0].type,
                hoveredValue,
                isFirst = realCompName === "Market_SPY" ? true : false,
                isLastComp = (Object.keys(allLiqSvg).indexOf(realCompName) + 1) === Object.keys(allLiqSvg).length ? true : false;

                // hover to the nearest value
                hoveredValue = d.reduce((a,b) => {
                    let aDiff = Math.abs(a.time - showTime);
                    let bDiff = Math.abs(b.time - showTime);

                    if (aDiff === bDiff) {
                        // Choose largest vs smallest (> vs <)
                        return a.time > b.time ? a : b;
                    } else {
                        return bDiff < aDiff ? b : a;
                    }
                });


                drawHoverLiq(hoveredValue, svg, newX, true, hoveredValue.time, isFirst, isLastComp);
            // all liq svg
            for(let companyName in allLiqSvg){
              let isFirst = companyName === "Market_SPY" ? true : false,
                  isLastComp = (Object.keys(allLiqSvg).indexOf(companyName) + 1) === Object.keys(allLiqSvg).length ? true : false;

              // check if it's current hover
              if (companyName === realCompName){

                allLiqSvg[companyName].selectAll(".liqRow")
                                      .each(d => {
                                        let type = d[0].type;

                                        if (type !== liqType){
                                          let nearest = d.reduce((a,b) => {
                                            let aDiff = Math.abs(a.time - hoveredValue.time);
                                            let bDiff = Math.abs(b.time - hoveredValue.time);
  
                                            if (aDiff === bDiff) {
                                                // Choose largest vs smallest (> vs <)
                                                return a.time > b.time ? a : b;
                                            } else {
                                                return bDiff < aDiff ? b : a;
                                            }
                                            });
                                              
                                              if (nearest.time - hoveredValue.time === 0){
                                                drawHoverLiq(nearest, allLiqSvg[companyName], newX, true, hoveredValue.time, isFirst, isLastComp);
                                              } else {
                                                drawHoverLiq(nearest, allLiqSvg[companyName], newX, false, hoveredValue.time, isFirst, isLastComp);
                                              };
                                        }

                                      })
              } else {
                allLiqSvg[companyName].selectAll(".liqRow")
                                      .each(d => {

                                        let nearest = d.reduce((a,b) => {
                                          let aDiff = Math.abs(a.time - hoveredValue.time);
                                          let bDiff = Math.abs(b.time - hoveredValue.time);

                                          if (aDiff === bDiff) {
                                              // Choose largest vs smallest (> vs <)
                                              return a.time > b.time ? a : b;
                                          } else {
                                              return bDiff < aDiff ? b : a;
                                          }
                                          });
                                        
                                        if (nearest.time - hoveredValue.time === 0){
                                          drawHoverLiq(nearest, allLiqSvg[companyName], newX, true, hoveredValue.time, isFirst, isLastComp);
                                        } else {
                                          drawHoverLiq(nearest, allLiqSvg[companyName], newX, false, hoveredValue.time, isFirst, isLastComp);
                                        };

                                      })
              }
            };

            // all svg
            for (let otherSvg in allSvg){
              let showTimeLabel = (Object.keys(allSvg).indexOf(otherSvg) + 1) === Object.keys(allSvg).length ? true : false ;
              // first element
              let isFirst = otherSvg === "Market_SPY" ? true : false ,
                  drawNumber = 0,
                  nearest = {prev:"", curr:"", isBegin: true, isDraw: false};


              allSvg[otherSvg].selectAll(".lob-row-cell")
                              .each((d) => {
                                // set axis 
                                // d.x = newX;
                                // d.x.range([0.09 * d.divWidth, 0.95 * d.divWidth]);

                                //
                                if(nearest.isBegin){
                                  nearest.prev = d;
                                  nearest.isBegin = false;
                                } else{

                                  nearest.curr = d;
                                  // console.log(nearest.curr.time - showTime, nearest.prev.time - showTime);
                                  if( !nearest.isDraw && (nearest.curr.time - hoveredValue.time >= 0) && (nearest.prev.time - hoveredValue.time <= 0) && (nearest.curr.section === nearest.prev.section)){
                                      
                                      if (nearest.curr.time - hoveredValue.time === 0){
                                        drawHover(d, allSvg[otherSvg], showTimeLabel, isFirst, true, hoveredValue.time);
                                        nearest.isDraw = (d.section === "Volume");
                                      } else{
                                        drawHover(d, allSvg[otherSvg], showTimeLabel, isFirst, false, hoveredValue.time);
                                        console.log(d.section ,d.section === "Volume");
                                        nearest.isDraw = (d.section === "Volume");
                                      }

                                      nearest.prev = nearest.curr;
                                      nearest.curr = "";
                                  } else{
                                      if (nearest.curr.section !== nearest.prev.section && !nearest.isDraw){
                                        if (nearest.prev.time - hoveredValue.time === 0){
                                          drawHover(nearest.prev, allSvg[otherSvg], showTimeLabel, isFirst, true, hoveredValue.time);
                                          nearest.isDraw = (d.section === "Volume");
                                        } else{
                                          drawHover(nearest.prev, allSvg[otherSvg], showTimeLabel, isFirst, false, hoveredValue.time);
                                          nearest.isDraw = (d.section === "Volume");
                                        }
                                      }
                                      nearest.prev = nearest.curr;
                                      nearest.curr = "";
                                  }

                                }
                                // if(d.time - showTime === 0){
                                //   if (drawNumber <= 4){
                                //     drawHover(d, allSvg[otherSvg], showTimeLabel, isFirst, true, showTime);
                                //     drawNumber = drawNumber + 1;
                                //   } 
                                  
                                // } else{
                                //   if (drawNumber <= 4){
                                //     console.log(d);
                                //     drawHover(d, allSvg[otherSvg], showTimeLabel, isFirst, false, showTime);
                                //     drawNumber = drawNumber + 1;
                                //   }
                                // }
                              })
            }


      
        })
       .on("mouseout", (event,d) => {
          d3.selectAll(".hoverlabel").remove();
        });

    // liq / lob zoom
    let zoom = d3.zoom()
    .scaleExtent([1, 40])  // This control how much you can unzoom (x1) and zoom (x40)
    .extent([[0, yOffset], [widthNum, 0.163*heightNum]])
    .translateExtent([[0, yOffset], [widthNum, 0.163*heightNum]])
    .on("zoom", (event) => {
        updateZoom(event, x, allSvg, allLiqSvg);
    });

    svg.append("rect")
    .attr("id","zoomPlane")
    .attr("width", widthNum)
    .attr("height", 0.163 * heightNum - yOffset)
    .style("fill", "none")
    .style("pointer-events", "all")
    .attr("transform", "translate(" + 0 + "," + yOffset + ")")
    .lower();


    svg.call(zoom);
   
      
  // add svg for tracking the records
  handleLiqSvg(divTitle.split("--")[1], svg);
};

function drawHoverLiq(hoveredData, svg, newX, showText, showTime, isFirst, isLastComp){

  // adjust hover text from the edge of the viz
  let adjustLine = isFirst? "8%":"-50%",
  // adjust hover text from the edge of the viz
      adjustScale = (hoveredData.index > 90) ? 0.87 : 1,
      yOffset = 15;

  // draw line
  svg.append("line")
  .attr("x1", newX(showTime))
  .attr("y1", adjustLine)
  .attr("x2", newX(showTime))
  .attr("y2", "150%")
  .attr("class", "hoverlabel")
  .attr("stroke", "black")

  if(showText){
    // Specify where to put label of text
    svg.append("text")
    .attr("class", "hoverlabel") // Create an id for text so we can select it later for removing on mouseout
    .attr("x", adjustScale * (hoveredData.xAxis(showTime) + 5))
    .attr("y", yOffset + hoveredData.yAxis(hoveredData.type))
    .style("font-size", "0.6vw")
    .text(function(){
        return hoveredData.type + ": " + hoveredData.yValue.toPrecision(3);
    });



    }

if(isLastComp && hoveredData.type === "Effective Spread"){

  // format the time 
  let format = d3.timeFormat("%H:%M:%S.%L"),
  time = format(showTime),
  adjustScale = (hoveredData.index > 90) ? 0.9 : 1.01;


  svg.append("text")
  .attr("class", "hoverlabel")  // Create an id for text so we can select it later for removing on mouseout
  .attr("x", adjustScale * (hoveredData.xAxis(showTime)))
  .attr("y", "100%")
  .style("font-size", "0.7vw")
  .text(function() {
      let text = "" + time;  // Value of the text
      return text;
      });

  }


};

function drawHover(mainData, svg, showTime, isFirst, hasText=false, showTimeValue){

  // adjust hover text from the edge of the viz
  let adjustScale = (mainData.index > 80) ? 0.82 : 1.04;
  // adjust hover line start point
  let adjustLine = isFirst ? "0%":"-20%";

  svg.append("line")
  .attr("x1", mainData.x(showTimeValue))
  .attr("y1", adjustLine)
  .attr("x2", mainData.x(showTimeValue))
  .attr("y2", "120%")
  .attr("class", "hoverlabel")
  .attr("stroke", "black")

  if(hasText){
      // Specify where to put label of text
      svg.append("text")
      .attr("id", mainData.id+"1") // Create an id for text so we can select it later for removing on mouseout
      .attr("class", "hoverlabel")
      .attr("x", function() { return adjustScale * mainData.x(showTimeValue) })
      .attr("y", function() { return mainData.y(mainData.section) })
      .attr("dy", "0.4vw")
      .style("font-size", "0.5vw")
      .text(function() {
          let text = mainData.section + " value:" + Math.abs(mainData.value);  // Value of the text
          return text;
          });
      svg.append("text")
      .attr("id", mainData.id+"2") // Create an id for text so we can select it later for removing on mouseout
      .attr("class", "hoverlabel")
      .attr("x", function() { return adjustScale * mainData.x(showTimeValue) })
      .attr("y", function() { return mainData.y(mainData.section) })
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
      time = format(showTimeValue),
      adjustScale = (mainData.index > 80) ? 0.9 : 1.05;


      svg.append("text")
      .attr("id", mainData.id+"time") // Create an id for text so we can select it later for removing on mouseout
      .attr("class", "hoverlabel")
      .attr("x", function() { return adjustScale * mainData.x(showTimeValue) })
      .attr("y", "116%")
      .style("font-size", "0.5vw")
      .style("color", "red")
      .text(function() {
          let text = "" + time;  // Value of the text
          return text;
          });
  };
};

function updateZoom(event, x, allSvg, allLiqSvg){
  // remove hovers
  d3.selectAll(".hoverlabel").remove();

  // find the number of stocks to put the xAxis in the position.
  let division = document.getElementById("metrics"),
  heightNum = division.clientHeight,
  widthNum = division.clientWidth,
  xPositionCoeff =  0.145;

  // recover the new scale
  let newX = event.transform.rescaleX(x);

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
                          d.xAxis = newX;
                          return d.yValue;
                      });
      svg.selectAll(".liqPath").remove();

      svg.selectAll(".liqRow")
         .append("path")
         .datum(d =>{return d;})
         .attr("class", "liqPath")
         .attr("stroke", "#e6e6e6")
         .attr("stroke-width", 0.5)
         .attr("d", d => {return area(d)})
         .style("fill", "url(#liqGradient)");
  }

  // update all SVG
  for (let compName in allSvg){
    let svg = allLiqSvg[compName];


  }
}


export default drawLiq;
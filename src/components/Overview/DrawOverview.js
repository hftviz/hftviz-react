import * as d3 from 'd3';


function splitToChunks(array, parts) {
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



function DrawOverview(allData, companyName, date, container, binSize){
    let dataFiltered = allData[companyName][date]["priceChange"];

    // console.log('im running ---' + container + '---- at :'+ binSize 
    //     + ' with min and max' + minVal + ',' + maxVal + ' with data ' + allData);
    
    // split data to chunks
    let dataPrice = splitToChunks(dataFiltered, binSize);

    let minVal = Math.min(...dataPrice);
    let maxVal = Math.max(...dataPrice);

    // Set some base properties.
    // Some come from an options object
    // pass when `Matrix` is called.
    // const width = "100%",
    //     height = "100%",
    const startColor = "#b30000",
        middleColor = "#ffffff",
        endColor = "#00b300",
        data = [dataPrice];
    // empty the container
    // items[i].innerText = '';

    const numrows = data.length
        // assume all subarrays have same length
    const numcols = data[0].length

    // clean inside of the svg
    document.getElementById(container).innerHTML = "";

    // Create the SVG container
    const svg = d3
        .select('#'+ container)
        .append("g")
        .attr("transform", "translate(0,0)")

    let current_box = document.getElementById(container);
    const height_num = current_box.clientHeight,
        width_num = current_box.clientWidth;

    // Build some scales for us to use
    const x = d3.scaleBand()
        .domain(d3.range(numcols))
        .range([0, width_num])

    const y = d3.scaleBand()
        .domain(d3.range(numrows))
        .range([0, height_num])

    // This scale in particular will
    // scale our colors from the start
    // color to the end color.
    const colorMap = d3.scaleLinear()
        .domain([minVal, 0.5 * (minVal + maxVal), maxVal])
        .range([startColor, middleColor, endColor])

    // Generate rows and columns and add
    // color fills.
    const row = svg
        .selectAll(".row")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "row")
        .attr("transform", "translate(0,0)")

    const cell = row
        .selectAll(".cell")
        .data(d => {
            return d
        })
        .enter()
        .append("g")
        .attr("class", "cell")
        .attr("transform", (d, i) => {
            return "translate(" + x(i) + ", 0)"
        })

    cell
        .append("rect")
        .attr("width", x.bandwidth())
        .attr("height", y.bandwidth())

    row
        .selectAll(".cell")
        .data((d, i) => {
            return data[i]
        })
        .style("fill", colorMap)
};

export default DrawOverview;
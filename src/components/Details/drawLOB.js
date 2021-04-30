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
};


function drawLOB(container, date, name, volumeData, bidData, askData, cancelData){

};

export default drawLOB;
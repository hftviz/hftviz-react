import React from 'react';
import "./OverviewLegend.css";
import {DrawLegend, splitToChunksLegend} from './DrawLegend';
import overviewData from '../../data/overviewSampleData.json';

class OverviewLegend extends React.Component {
    constructor(props){
        super(props);

        this.canvas = React.createRef();
        this.calculateMaxMin = this.calculateMaxMin.bind(this);
        // initiate it for the comparison and change

        this.allChunks = [];
    }

    componentDidMount(){
        let min, max;
        [min,max] = this.calculateMaxMin(10000, 0);
        DrawLegend(this.canvas.current.id, min, max);

    }

    componentDidUpdate(){
        let min, max;
        [min,max] = this.calculateMaxMin(10000, 0);
        DrawLegend(this.canvas.current.id, min, max);

    }

    calculateMaxMin(totalMin, totalMax){

        this.allChunks = [];
        let date = '2019-01-03' //In propduction we have to set it to: this.props.dateTime;

        for (let company in overviewData){

            this.allChunks.push(splitToChunksLegend(overviewData[company][date]["priceChange"], this.props.binSize));


        }

        for (let item in this.allChunks){
            let localMin = Math.min(...this.allChunks[item]);
            let localMax = Math.max(...this.allChunks[item]);

            totalMin = (totalMin > localMin) ? localMin : totalMin;
            totalMax = (totalMax < localMax) ? localMax : totalMax;
        }

        return ([totalMin.toFixed(2), totalMax.toFixed(2)]);

    }

    render() {
        return(

            <div id="drawOverviewLegend" ref={this.canvas}></div>

        );
    }
    
}

export default OverviewLegend;
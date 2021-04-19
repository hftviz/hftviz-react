import React from 'react';
import "./Overview.css";
import DrawOverview from "./DrawOverview.js";
import overviewData from '../../data/overviewSampleData.json';

class Draw extends React.Component {
    constructor(props){
        super(props);

        this.calculateMaxMin = this.calculateMaxMin.bind(this);

        this.canvasRef = React.createRef();
        this.minValue = 100000000;
        this.maxValue = 0;
    }

    calculateMaxMin(){
    
        for (let company in overviewData){
            for (let date in  overviewData[company]){
                let localMin = Math.min(...overviewData[company][date]["priceChange"]);
                let localMax = Math.max(...overviewData[company][date]["priceChange"]);

                this.minValue = (this.minValue > localMin) ? localMin : this.minValue;
                this.maxValue = (this.maxValue < localMax) ? localMax : this.maxValue;
            }

        }

    }

    componentDidMount(){

        this.calculateMaxMin();

        let date = "2019-01-04"; // in production it should be this.props.dateTime

        console.log(this.minValue, this.maxValue, overviewData);
        // draw
        DrawOverview(
            overviewData,
            this.props.symbol,
            date,
            this.canvasRef.current.id,
            this.minValue,
            this.maxValue,
            this.props.binSize
        );
    }


    render() {

        return(

            <svg id={"draw-"+this.props.symbol} className="draw" ref={this.canvasRef}></svg>

        );
    }
    
}

export default Draw;
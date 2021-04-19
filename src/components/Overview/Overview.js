import React from 'react';
import "./Overview.css";
import OverviewStocks from './OverviewStocks';
import Legend from '../Legend/Legend';

class Overview extends React.Component {
    constructor(props){
        super(props);

        this.calculateMaxMin = this.calculateMaxMin.bind(this);
        // initiate it for the comparison and change
        this.minValue = 100000000;
        this.maxValue = 0;
    }

    // componentWillMount is not safe based on the React's document. It'll be fire from the package in v18.0.0 and later.

    componentWillMount(){
        this.calculateMaxMin();
    }

    calculateMaxMin(){

        for (var company in this.props.overviewData){
            this.props.overviewData[company].forEach(element => {
                let localMin = Math.min(...element["priceChange"]);
                let localMax = Math.max(...element["priceChange"]);

                this.minValue = (this.minValue > localMin) ? localMin : this.minValue;
                this.maxValue = (this.maxValue < localMax) ? localMax : this.maxValue;
            });
        }

    }


    render() {

        return(

            <div id="main-panel-wrapper">

                <div id="overviewStocks">
                    <OverviewStocks 
                        overviewData = {this.props.overviewData}
                        selectedStocks = {this.props.selectedStocks}
                        sortData = {this.props.sortData}
                        binSize = {this.props.binSize}
                        dateTime = {this.props.dateTime}
                        minVal = {this.minValue}
                        maxVal = {this.maxValue}
                        onChangeSelectedStocks={this.props.onChangeSelectedStocks}
                    />
                </div>

                <div id="overviewLegend">
                    <Legend />
                </div>

            </div>

        );
    }
    
}

export default Overview;
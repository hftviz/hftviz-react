import React from 'react';
import "./Overview.css";
import OverviewStocks from './OverviewStocks';
import OverviewLegend from '../OverviewLegend/OverviewLegend';

class Overview extends React.Component {

    render() {

        return(

            <div id="main-panel-wrapper">

                <div id="overviewStocks">
                    <OverviewStocks 
                        selectedStocks = {this.props.selectedStocks}
                        sortData = {this.props.sortData}
                        binSize = {this.props.binSize}
                        dateTime = {this.props.dateTime}
                        onChangeSelectedStocks={this.props.onChangeSelectedStocks}
                    />
                </div>

                <div id="overviewLegend">
                    <OverviewLegend
                        binSize = {this.props.binSize}
                        dateTime = {this.props.dateTime}
                     />
                </div>

            </div>

        );
    }
    
}

export default Overview;
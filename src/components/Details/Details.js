import React from 'react';
import "./Details.css";
import Lob from "./Lob";
import levels from './levels.js';
import LobLegend from './LobLegend';

class Details extends React.Component {
    constructor(props){
        super(props);

        // state
        this.state = {zoomLevel: 1, min: 0, max: 0};

        // bind handlers
        this.handleZoomChange = this.handleZoomChange.bind(this);
    }

    // THIS IS NOT COMPLETED YET
    handleZoomChange(){
        this.setState(
            {
                zoomLevel: 2
            }
        );
    }

    // IMPORTANT NOTE FOR FURTHURE UPDATE:
    // We need to put data here to calculate min, max and level of data and pass it
    // to the children divisions.
    //


    render() {
        let lobs = [];

        // filter the level data based on zoomLevel. Now is for zoom == 1.
        let level;
        if (this.props.zoomLevel === 1 ) 
        {
            let source = levels.level1;
            // make copy from source
            level = JSON.parse(JSON.stringify(source));
        };

        // calculating min and max of messageNum for all data
        let maxMessageNum = 0,
            minMessageNum = 10000000000;
        for (let type in level) {
            let obj = level[type];

            for (let company in obj){
                for (let date in obj[company]){
                    let localMax = Math.max(...obj[company][date]["messageNum"]),
                        localMin = Math.min(...obj[company][date]["messageNum"]);

                    maxMessageNum = localMax > maxMessageNum ? localMax : maxMessageNum ;
                    minMessageNum = localMin < minMessageNum ? localMin : minMessageNum ;
                };
            };
        };

        // added market for showing movements of the market.
        let addedMarket = Array.from(this.props.selectedStocks);
        addedMarket.unshift("Market--Market_SPY");

        addedMarket.forEach(stock => {
            lobs.push(
                <Lob 
                    key={stock} 
                    name={stock} 
                    dateTime={this.props.dateTime} 
                    zoomLevel={this.state.zoomLevel}
                    level = {level}
                    minMessageNum = {minMessageNum}
                    maxMessageNum = {maxMessageNum}
                />
            );
        });


        return(

            <div id="details">
                <div id="lob"> 
                    <div className="title">Limit Order Book</div>
                    {lobs} 
                </div>
                <div id="lob-legend"> 
                    <LobLegend                     
                        minMessageNum = {minMessageNum}
                        maxMessageNum = {maxMessageNum}
                    />
                </div>
                <div id="metrics">
                    <div className="title">Liquidity</div>
                    
                </div>
            </div>

        );
    }
    
}

export default Details;
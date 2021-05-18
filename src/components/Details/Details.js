import React from 'react';
import "./Details.css";
import Lob from "./Lob";
import levels from './levels.js';
import LobLegend from './LobLegend';
import Liquidity from './Liquidity';

class Details extends React.Component {
    constructor(props){
        super(props);

        // state
        this.state = {zoomLevel: 1};

        // all SVGs
        this.lobSvg = {};
        this.liqSvg = {};

        // bind handlers
        this.handleZoomChange = this.handleZoomChange.bind(this);
        this.handleLobSvg = this.handleLobSvg.bind(this);
        this.handleLiqSvg = this.handleLiqSvg.bind(this);
    }


    handleLobSvg(name, svg){
        this.lobSvg[name] = svg;
    };

    handleLiqSvg(compName, svg){
            this.liqSvg[compName] = svg;
    };

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
        let lobs = [],
            liqs = [];

        // filter the level data based on zoomLevel. Now is for zoom == 1.
        let level;
        if (this.props.zoomLevel === 1 ) 
        {
            let source = levels.level1;
            // make copy from source
            level = JSON.parse(JSON.stringify(source));
        };
        // here we will add liquidities data for each stock

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


        // update all svg
        for (let svgComp in this.lobSvg){
            if (!(svgComp in addedMarket)){
                delete this.lobSvg[svgComp];
                delete this.liqSvg[svgComp];
            };
        };


        addedMarket.forEach(stock => {
            let isLastStock = addedMarket.indexOf(stock) === (addedMarket.length - 1) ? true : false;
            lobs.push(
                <Lob 
                    key={stock} 
                    name={stock} 
                    dateTime={this.props.dateTime} 
                    zoomLevel={this.state.zoomLevel}
                    level = {level}
                    minMessageNum = {minMessageNum}
                    maxMessageNum = {maxMessageNum}
                    isLastStock = {isLastStock}
                    allSvg = {this.lobSvg}
                    allLiqSvg = {this.liqSvg}
                    handleLobSvg = {this.handleLobSvg}
                    handleLiqSvg = {this.handleLiqSvg}
                />
            );


            liqs.push(
                // we change the data in production
                <Liquidity 
                    key={stock} 
                    name={stock} 
                    dateTime={this.props.dateTime} 
                    zoomLevel={this.state.zoomLevel}
                    data = {level.bid}
                    isLastStock = {isLastStock}
                    allSvg = {this.lobSvg}
                    allLiqSvg = {this.liqSvg}
                    handleLobSvg = {this.handleLobSvg}
                    handleLiqSvg = {this.handleLiqSvg}
                />
            );

            let stockSymbol = stock.split("--")[1];
            this.lobSvg[stockSymbol] = "";
            this.liqSvg[stockSymbol] = "";
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
                    {/* the data will be replaced by liquidity data later */}
                    <div className="title">Liquidity</div>
                    {liqs} 
                </div>
            </div>

        );
    }
    
}

export default Details;
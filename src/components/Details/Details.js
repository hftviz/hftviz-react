import React from 'react';
import "./Details.css";
import Lob from "./Lob";

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
                />
            );
        });


        return(

            <div id="details">
                <div id="lob"> 
                    <div className="title">Limit Order Book</div>
                    {lobs} 
                </div>
                <div id="lob-legend"> lob-legend </div>
                <div id="metrics">
                    <div className="title">Liquidity</div>
                    
                </div>
            </div>

        );
    }
    
}

export default Details;
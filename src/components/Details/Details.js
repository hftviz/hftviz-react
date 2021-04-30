import React from 'react';
import "./Details.css";
import Lob from "./Lob";

class Details extends React.Component {


    render() {
        let lobs = [];
        this.props.selectedStocks.forEach(stock => {
            lobs.push(
                <Lob key={stock} name={stock} dateTime={this.props.dateTime}/>
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
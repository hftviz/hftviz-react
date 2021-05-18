import React from 'react';
import "./Details.css";
import Liq4company from './Liq4company';

class Liquidity extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
    }

    componentDidUpdate(prevProps){
    }


    render() {
        // in production, we'll remove this and use real data liquidity
        let liqNames = ["Effective Spread", "Realized Spread", "Price Impact"];



        return(

            <div id={this.props.name.split("--")[1]} className="liquidity">
                <Liq4company 
                    name={this.props.name.split("--")[1]}
                    dateTime={this.props.dateTime} 
                    zoomLevel={this.props.zoomLevel}
                    data = {this.props.data}
                    isLastStock = {this.props.isLastStock}
                    title = {this.props.name}
                    allSvg = {this.props.allSvg}
                    allLiqSvg = {this.props.allLiqSvg}
                    handleLobSvg = {this.props.handleLobSvg}
                    handleLiqSvg = {this.props.handleLiqSvg}
                    liqNames = {liqNames}
                />
            </div>

        );
    }
    
}

export default Liquidity;
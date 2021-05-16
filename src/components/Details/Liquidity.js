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
        let liq4company = [];

        // in production, we'll remove this and use real data liquidity
        let liqName = ["Effective Spread", "Realized Spread", "Price Impact"];

        liqName.forEach(liq => {
            let isLastLiq = liqName.indexOf(liq) === (liqName.length - 1) ? true : false;
            liq4company.push(
                <Liq4company 
                    key={liq}
                    name={liq}
                    dateTime={this.props.dateTime} 
                    zoomLevel={this.props.zoomLevel}
                    data = {this.props.data}
                    divNum = {liqName.indexOf(liq)}
                    isLastLiq = {isLastLiq}
                    title = {this.props.name}
                    allSvg = {this.props.allSvg}
                    allLiqSvg = {this.props.allLiqSvg}
                    handleLobSvg = {this.props.handleLobSvg}
                    handleLiqSvg = {this.props.handleLiqSvg}
                />
            );
        });



        return(

            <div id={this.props.name.split("--")[1]} className="liquidity">
                <div className="liqTitle"> {this.props.name.split("--")[1]} </div>
                {liq4company}
            </div>

        );
    }
    
}

export default Liquidity;
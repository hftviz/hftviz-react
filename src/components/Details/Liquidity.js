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

        this.props.stocks.forEach(stock => {
            let isLastStock = this.props.stocks.indexOf(stock) === (this.props.stocks.length - 1) ? true : false;
            liq4company.push(
                <Liq4company 
                    key={stock}
                    name={stock}
                    dateTime={this.props.dateTime} 
                    zoomLevel={this.props.zoomLevel}
                    data = {this.props.data}
                    liqNum = {this.props.title}
                    divNum = {this.props.stocks.indexOf(stock)}
                    isLastStock = {isLastStock}
                    title = {this.props.title}
                />
            );
        });



        return(

            <div id={this.props.title} className="liquidity">
                <div className="liqTitle"> {this.props.title} </div>
                {liq4company}
            </div>

        );
    }
    
}

export default Liquidity;
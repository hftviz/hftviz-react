import React from 'react';
import "./Overview.css";
import Draw from './Draw';

class Stock extends React.Component {
    constructor(props){
        super(props);

        this.handleClick = this.handleClick.bind(this);

    }


    handleClick(){
        let stockName = this.props.fullName + '--' + this.props.symbol;

        if(!this.props.isSelected){
            this.props.onChangeSelectedStocks(stockName, 'add');
        }else{
            this.props.onChangeSelectedStocks(stockName, 'remove');
        }
    }

    render() {

        if(this.props.isSelected){
            return(
                <div id={this.props.symbol} className="stockVizSelected" onClick={this.handleClick}>
                    <div className="stockNameLegend">{this.props.symbol}</div>
                    <Draw
                        dateTime={this.props.dateTime}
                        fullName={this.props.fullName}
                        symbol={this.props.symbol}
                        binSize={this.props.binSize}
                     />
                    <div className="stockVizText">
                        {this.props.fullName} 
                    </div>
                </div>
    
            );
        } else{

            return(

                <div id={this.props.symbol} className="stockViz" onClick={this.handleClick}> 
                    <Draw
                        dateTime={this.props.dateTime}
                        fullName={this.props.fullName}
                        symbol={this.props.symbol}
                        binSize={this.props.binSize}
                     />
                    <div className="stockVizText">
                        {this.props.fullName} 
                    </div>
                </div>
    
            );
        }
    }
    
}

export default Stock;
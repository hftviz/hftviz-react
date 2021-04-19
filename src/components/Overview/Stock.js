import React from 'react';
import "./Overview.css";
import Draw from './Draw';

class Stock extends React.Component {
    constructor(props){
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.state = {data: this.props.overviewData}

    }


    handleClick(){
        let stockName = this.props.fullName + '--' + this.props.symbol;
        this.props.onChangeSelectedStocks(stockName, 'add');
    }

    render() {

        if(this.props.isSelected){
            return(
                <fieldset id={this.props.symbol} className="stockVizSelected">
                    <legend className="stockNameLegend">{this.props.symbol}</legend>
                    <Draw
                        dateTime={this.props.dateTime}
                        fullName={this.props.fullName}
                        symbol={this.props.symbol}
                        binSize={this.props.binSize}
                     />
                    <div className="stockVizText">
                        {this.props.fullName} 
                    </div>
                </fieldset>
    
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
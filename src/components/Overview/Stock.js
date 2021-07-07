import React from 'react';
import "./Overview.css";
import Draw from './Draw';

class Stock extends React.Component {
    constructor(props){
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleHover = this.handleHover.bind(this);
        this.stockRef = React.createRef();

    }


    handleClick(){
        let stockName = this.props.fullName + '--' + this.props.symbol;

        if(!this.props.isSelected){
            this.props.onChangeSelectedStocks(stockName, 'add');
        }else{
            this.props.onChangeSelectedStocks(stockName, 'remove');
        }
    }

    handleHover(e){
        let d = document.getElementById(this.stockRef.current.id + "-hoverlabel");

        d.style.left = (e.clientX - 0.13 * e.view.innerWidth)+ "px";

        if( e.clientY >= (0.9 * e.view.innerHeight)){
            d.style.top =  0.9 * e.clientY + "px";
        }

        if( e.clientX >= (0.85 * e.view.innerWidth)){
            d.style.left =  (e.clientX - 0.2 * e.view.innerWidth) + "px";
        }

    }

    render() {
        let child = [
            <div id={this.props.symbol} className="stockViz" onClick={this.handleClick} key="1" onMouseOver={this.handleHover} ref={this.stockRef}> 
            <Draw
                dateTime={this.props.dateTime}
                fullName={this.props.fullName}
                symbol={this.props.symbol}
                binSize={this.props.binSize}
            />
        </div>,
            <div className="stockVizText" key="2" id={this.props.symbol + "-hoverlabel"}>
                <div className="hoverTextTitle">{this.props.fullName}</div> 
                <div className="hoverTextDetails">Volume: {this.props.volume}</div>
                <div className="hoverTextDetails">Market Cap: {this.props.marketCap}</div>
            </div>
        ];

        if(this.props.isSelected){
            return(
                [<div id={this.props.symbol} className="stockVizSelected" onClick={this.handleClick} key="1">
                    <div className="stockNameLegend">{this.props.symbol}</div>
                    <Draw
                        dateTime={this.props.dateTime}
                        fullName={this.props.fullName}
                        symbol={this.props.symbol}
                        binSize={this.props.binSize}
                     />
                </div>,
            <div className="stockVizText" key="2" id={this.props.symbol + "-hoverlabel"}>
                <div className="hoverTextTitle">{this.props.fullName}</div> 
                <div className="hoverTextDetails">Volume: {this.props.volume}</div>
                <div className="hoverTextDetails">Market Cap: {this.props.marketCap}</div>
            </div>
        ]
    
            );
        } else{

            return(
                child
            );
        }
    }
    
}

export default Stock;
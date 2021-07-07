import React from 'react';
import "./Overview.css";
import Stock from './Stock';

class OverviewStocks extends React.Component {


    render() {

        let children = [];
        // let dates = ["2019-01-03", "2019-01-04", "2019-01-05"]; // in production: this.props.dateTime
        // let date = dates[Math.floor(Math.random() * dates.length)];
        // let data;
        let isSelected;

        this.props.sortData.forEach(stock => {

            // isSelected is a flag for highlighting the stock in the panel.
            isSelected = (this.props.selectedStocks.indexOf(stock.Name+'--'+stock.Symbol) === -1) ? false : true ;

            // this.props.overviewData[stock.Symbol].forEach(element => {
            //     if ( element["date"] === date) { data = element["priceChange"]};
            // });

            children.push(
                <Stock 
                    key={stock.Symbol} 
                    dateTime={this.props.dateTime}
                    fullName={stock.Name}
                    symbol={stock.Symbol}
                    volume={stock.Volume}
                    marketCap={stock.MarketCap} 
                    isSelected={isSelected} 
                    binSize={this.props.binSize}
                    onChangeSelectedStocks = {this.props.onChangeSelectedStocks}
                />
            );
        });




        return(

            children

        );
    }
    
}

export default OverviewStocks;
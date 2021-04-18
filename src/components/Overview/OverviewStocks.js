import React from 'react';
import "./Overview.css";
import Stock from './Stock';

class OverviewStocks extends React.Component {


    render() {
        let children = [];
        let dates = ["2019-01-03", "2019-01-04", "2019-01-05"]; // in production: this.props.dateTime
        let date = dates[Math.floor(Math.random() * dates.length)];
        let data;

        this.props.sortData.forEach(stock => {
            this.props.overviewData[stock.Symbol].forEach(element => {
                console.log(element);
                if ( element["date"] === date) { data = element["priceChange"]}
            });

            children.push(
                <Stock key={stock.Symbol} fullName={stock.Name} data={data} />
            );
        });




        return(

            <div> {children} </div>

        );
    }
    
}

export default OverviewStocks;